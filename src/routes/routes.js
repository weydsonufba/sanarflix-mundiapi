const customers = require('../services/customers-service.js');
const cards = require('../services/cards-service.js');
const plans = require('../services/plans-service.js');
const client = require('../services/clients-service.js');

var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send("Hello Sanar! Api de pagamento");
    });

    app.post("/customers", function(req, res) {
        return customers.createCustomer(req.body).then((data) => {
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

    app.post("/card", function(req, res) {

        return cards.createCard(req.query.id_customer, req.headers.authorization.substring(7, req.headers.authorization.length), req.body).then((data) => {
            console.log(data);
            return res.send(data);
        }).catch((err) => {
            res.send({ "status": "error", "message": "ops! Ocorreu algum erro: " + err });
        });
    });

    app.post("/client", function(req, res) {

        return client.createClient(req.body).then((data) => {
            console.log(data);
            return res.send(data);
        }).catch((err) => {
            res.send({ "status": "error", "message": "ops! Ocorreu algum erro: " + err });
        });
    });

    app.post("/plans", function(req, res) {

        return plans.createPlan(req).then((data) => {
            console.log(data);
            return res.send(data);
        }).catch((err) => {
            res.send({ "status": "error", "message": "ops! Ocorreu algum erro: " + err });
        });
    });
}

module.exports = appRouter;