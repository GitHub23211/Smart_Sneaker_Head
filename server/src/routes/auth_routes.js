const express = require('express')
const product = require('../controllers/product')
const auth = require('../controllers/auth')

const router = express.Router()

/* GET request to get all products */
router.get('/api/product', product.getProducts)

/* POST request that registers user to website */
router.post('/auth/register/user', auth.createUser)

/* POST request that registers seller to website */
router.post('/auth/register/seller', auth.createSeller)

/* POST request to log user into website */
router.post(`/auth/login`, auth.loginUser)

/* GET request to log user out of website */
router.get(`/auth/logout`, auth.logoutUser)

module.exports = router