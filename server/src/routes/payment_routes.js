const express = require('express')
const stripe = require('../controllers/stripe')

const router = express.Router()

/* GET request that returns currently logged in user */
router.post('/api/cart/checkout', stripe.paymentIntent)

module.exports = router