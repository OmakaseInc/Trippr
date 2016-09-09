var path = require('path')
require('dotenv').config();
var stripe = require('stripe')(process.env.secret_key);
var Promise = require('bluebird');

module.exports = {
  chargeCustomer: function(req, res) {
    stripe.tokens.create({
      card: {
        "number": req.body.number,
        "exp_month": req.body.exp_month,
        "exp_year": req.body.exp_year,
        "cvc": req.body.cvc
        // TEST CARD
        // "number": '4242424242424242',
        // "exp_month": 12,
        // "exp_year": 2017,
        // "cvc": '123'
      }
    })
    .then(
      function(token) {
        stripe.charges.create({
          amount: 100*req.body.price,
          currency: "usd",
          source: token.id,
          description: "Charge for Trippr"
        })
        .then(
          function(charge) {
            res.status(200).send('Succesfully charged')
          },
          function(error) {
            res.status(500).send('There was an error with this charge');
          }
        )
      },
      function(error) {
        res.status(500).send('There was an error accepting this card');
      }
    );
  },

  payDriver: function(req, res) {
    stripe.transfers.create({
      amount: 100*req.body.price,
      currency: "usd",
      destination: req.body.customerId,
      description: "Payment from Trippr"
    })
  }
}
