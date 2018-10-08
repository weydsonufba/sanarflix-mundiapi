 module.exports = {
     createCard(id_customer, access_token, data) {
         const request = require("request");
         var options = {
             method: 'POST',
             uri: 'https://api.mundipagg.com/core/v1/customers/' + id_customer + '/cards',
             headers: {
                 'Authorization': 'Bearer ' + access_token,
                 'Content-Type': 'application/json'
             },
             json: data
         };
         return new Promise((resolve, reject) => {
             return request(options, function(error, response, body) {
                 return resolve(response.body);
             });
         });
     }

 };