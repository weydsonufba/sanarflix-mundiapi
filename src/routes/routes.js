const customers = require('../services/customers-service.js');

var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    app.get("/account", function(req, res) {
        var accountMock = {
            "username": "nraboy",
            "password": "1234",
            "twitter": "@nraboy"
        }
        if (!req.query.username) {
            return res.send({ "status": "error", "message": "missing username" });
        } else if (req.query.username != accountMock.username) {
            return res.send({ "status": "error", "message": "wrong username" });
        } else {
            return res.send(accountMock);
        }

    });
    app.post("/account", function(req, res) {
        if (!req.body.username || !req.body.password || !req.body.twitter) {
            return res.send({ "status": "error", "message": "missing a parameter" });
        } else {
            return res.send(req.body);
        }
    });

    app.post("/customers", function(req, res) {
        return customers.createCustomer(req).then((data) => {
            console.log(data);
            return res.send(data);
        }).catch((err) => {
            res.send({ "status": "error", "message": "ops! Ocorreu algum erro: " + err });
        });
    });

    app.get("/customer", function(req, res) {
        return customers.getCustomer(req).then((data) => {
            console.log(data);
            return res.send(data);
        }).catch((err) => {
            res.send({ "status": "error", "message": "ops! Ocorreu algum erro: " + err });
        });
    });
}

module.exports = appRouter;