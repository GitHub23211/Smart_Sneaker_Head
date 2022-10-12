const express = require('express')
const product = require('../controllers/product')
const cart = require('../controllers/cart')
const profile = require('../controllers/profile')
const auth = require('../controllers/auth')

const router = express.Router()

/* GET request that returns currently logged in user */
router.get('/auth', auth.getUser)

/* POST request to register product on to website for sale */
router.post(`/api/product/register`, product.createProduct)

/* PUT request to edit product details */
router.put(`/api/product/update/:productid`, product.updateProduct)

/* DELETE request to remove a product for sale */
router.delete(`/api/product/delete/:productid`, product.deleteProduct)

/* PUT request to add products to cart */
router.put(`/api/cart/add/:productid`, cart.addToCart)

/* PUT request to update quantity of item in cart */
router.put(`/api/cart/update/:productid`, cart.updateQuantity)

/* DELETE request to remove a product from cart */
router.delete(`/api/cart/delete/:productid`, cart.deleteFromCart)

/* PUT request to update user profile information */
router.put('/api/profile/update', profile.updateProfile)

module.exports = router 