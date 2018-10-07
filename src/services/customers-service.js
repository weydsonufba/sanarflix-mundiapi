 module.exports = {
     createCustomer(req) {
         // var fs = require('fs');
         const request = require("request");
         // var body = JSON.parse(fs.readFileSync('body.json', 'utf8'));
         var options;

         options = {
             method: 'POST',
             uri: 'https://api.mundipagg.com/core/v1/customers',
             headers: {
                 'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
                 'Content-Type': 'application/json'
             },
             json: req.body
         };
         return new Promise((resolve, reject) => {
             return request(options, function(error, response, body) {
                 return resolve(response.body);
             });
         });
     },
     getAccessToken(id) {

         const request = require("request");
         var options = {
             method: 'GET',
             uri: 'https://api.mundipagg.com/core/v1/customers/' + id + '/access-tokens',
             headers: {
                 'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
                 'Content-Type': 'application/json'
             },
             json: { "expires_in": 60 }
         };
         return new Promise((resolve, reject) => {
             return request(options, function(error, response, body) {
                 console.log(response.body.data)
                 return resolve(response.body.data[0].code);
             });
         });
     },

     getCustomer(req) {
         if (req.query.id) {
             const request = require("request");
             return this.getAccessToken(req.query.id).then((access_token) => {

                 var options = {
                     method: 'GET',
                     uri: 'https://api.mundipagg.com/core/v1/customers/' + req.query.id + '/?appid=' + new Buffer("pk_test_zD9Jq9IoaSx1JVOk:").toString('base64'),
                     headers: {
                         'Authorization': 'Bearer ' + access_token,
                         'Content-Type': 'application/json'
                     },
                     //json: req.body
                 };
                 return new Promise((resolve, reject) => {
                     return request(options, function(error, response, body) {
                         return resolve(response.body);
                     });
                 });
             }).catch((err) => {
                 console.log(err);
             });
         }
     },


 };