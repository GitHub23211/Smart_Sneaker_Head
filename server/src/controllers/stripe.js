const models = require('../models')
const config = require('../config')
const stripe = require("stripe")(config.stripe)

const paymentIntent = async (request, response) => {
    await stripe.paymentIntents.create({
        amount: 100,
        currency: "aud",
        automatic_payment_methods: {
            enabled: true
        }
    })

    response.send({clientSecret: paymentIntent.client_secret})
}

module.exports = {
    paymentIntent
}