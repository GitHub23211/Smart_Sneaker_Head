const express = require('express')
const auth = require('./controllers/auth')
const product = require('./controllers/product')

const router = express.Router()

router.get('/', (request, response) => response.send("<h1>Hello World</h1>"))

/* GET request that returns currently logged in user */
router.get('/auth/', auth.getUser)

/* POST request that registers user to website */
router.post('/auth/register', auth.createUser)

/* POST request to log user into website */
router.post(`/auth/login`, auth.loginUser)

/* POST request to register product on to website for sale */
router.post(`/api/product/register`, product.createProduct)

/* PUT request to edit product details */
router.put(`/api/product/update/:productid`, product.updateProduct)

/* DELETE request to remove a product for sale */
router.delete(`/api/product/delete/:productid`, product.deleteProduct)


module.exports = router 