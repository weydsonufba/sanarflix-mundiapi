 module.exports = {
     createSubscription(body) {

         const request = require("request");
         var options = {
             method: 'POST',
             uri: 'https://api.mundipagg.com/core/v1/subscriptions',
             headers: {
                 'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
                 'Content-Type': 'application/json'
             },
             json: body
         };
         return new Promise((resolve, reject) => {
             return request(options, function(error, response, body) {
                 return resolve(response.body);
             });
         });
     },
     getSubscription(id) {
         const request = require("request");
         var options = {
             method: 'GET',
             uri: 'https://api.mundipagg.com/core/v1/plans/' + id,
             headers: {
                 'Authorization': 'Bearer ' + new Buffer("pk_test_zD9Jq9IoaSx1JVOk:").toString('base64'),
                 'Content-Type': 'application/json'
             },

         };
         return new Promise((resolve, reject) => {
             return request(options, function(error, response, body) {
                 return resolve(response.body);
             });
         });
     }

 };