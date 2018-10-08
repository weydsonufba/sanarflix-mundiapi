const customers = require('./customers-service.js');
const cards = require('./cards-service.js');
const subscriptions = require('./subscriptions-service.js');
module.exports = {
    createClient(req) {
        const request = require("request");
        var cliente = {
            name: req.cliente.nome,
            email: req.cliente.email
        }
        var card = {
            holder_name: req.cliente.nome,
            number: req.cartao.numero,
            exp_month: req.cartao.expiracao_mes,
            exp_year: req.cartao.expiracao_ano,
            cvv: req.cartao.cvv
        }

        if (req.produtos) {
            req.produtos.forEach(element => {
                if (element.tipo = "plano") {
                    plano_id = element.plano_id
                }
            });
        }
        var subs = {
            plan_id: plano_id,
            payment_method: "credit_card",
            customer: {
                name: req.cliente.nome,
                email: req.cliente.email
            },
            credit_card: {
                card_id: "",
                number: req.cartao.numero,
                exp_month: req.cartao.expiracao_mes,
                exp_year: req.cartao.expiracao_ano,
                cvv: req.cartao.cvv,

            },
            card: ""
        }

        return customers.createCustomer(cliente).then((data) => {
            return data;
        }).then((result) => {
            cliente_criado = result;
            return customers.createAccessToken(result.id).then((data) => {
                return data;
            }).then((result) => {
                return cards.createCard(cliente_criado.id, result, card).then((data => {
                    subs.card = data;
                    subs.card.number = subs.credit_card.number;
                    return data;
                })).then((result) => {
                    return subscriptions.createSubscription(subs).then((data) => {
                        console.log(data)
                        return data;
                    })
                });

            })
        })

    }

};