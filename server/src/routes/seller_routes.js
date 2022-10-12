const express = require('express')
const product = require('../controllers/product')

const router = express.Router()

/* POST request to register product on to website for sale */
router.post(`/api/product/register`, product.createProduct)

/* PUT request to edit product details */
router.put(`/api/product/update/:productid`, product.updateProduct)

/* DELETE request to remove a product for sale */
router.delete(`/api/product/delete/:productid`, product.deleteProduct)

module.exports = router