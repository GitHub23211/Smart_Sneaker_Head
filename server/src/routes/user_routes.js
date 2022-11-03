const express = require('express')
const cart = require('../controllers/cart')
const wishlist = require('../controllers/wishlist')
const profile = require('../controllers/profile')
const auth = require('../controllers/auth')
const review = require('../controllers/review')

const router = express.Router()

/* GET request that returns currently logged in user */
router.get('/auth/user', auth.getUser)

/* PUT request to add products to cart */
router.put(`/api/cart/add/:productid`, cart.addToCart)

/* PUT request to update quantity of item in cart */
router.put(`/api/cart/update/:productid`, cart.updateQuantity)

/* DELETE request to remove a product from cart */
router.delete(`/api/cart/delete/:productid`, cart.deleteFromCart)

/* PUT request to add products to wishlist */
router.put(`/api/wishlist/add/:productid`, wishlist.addToWishlist)

/* DELETE request to remove a product from wishlist */
router.delete(`/api/wishlist/delete/:productid`, wishlist.deleteFromWishlist)

/* PUT request to update user profile information */
router.put('/api/profile/update', profile.updateProfile)

/* PUT request to add review to product */
router.put(`/api/review/add/:productid`, review.createReview)

module.exports = router 