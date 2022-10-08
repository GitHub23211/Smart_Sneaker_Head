const express = require('express')
const product = require('../controllers/product')
const auth = require('../controllers/auth')

const router = express.Router()

/* GET request to get all products */
router.get("/api/product", product.getProducts)

/* GET request that returns currently logged in user */
router.get('/auth', auth.getUser)

/* POST request that registers user to website */
router.post('/auth/register', auth.createUser)

/* POST request to log user into website */
router.post(`/auth/login`, auth.loginUser)

module.exports = router