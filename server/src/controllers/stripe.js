const config = require('../config')
const stripe = require("stripe")(config.stripe)

const paymentIntent = async (request, response) => {
    const intent = await stripe.paymentIntents.create({
        amount: 100,
        currency: "aud",
        automatic_payment_methods: {
            enabled: true
        }
    })
    console.log(intent.client_secret)

    return response.status(200).json({clientSecret: intent.client_secret})
}

module.exports = {
    paymentIntent
}