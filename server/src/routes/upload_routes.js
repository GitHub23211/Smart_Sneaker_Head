const express = require('express')
const upload = require('../middleware/upload')
const router = express.Router()

const avatarDest = './server/src/pictures/avatars'
const productDest = './server/src/pictures/products'

/* POST request to upload a user avatar to backend */
router.post('/api/upload/avatar', upload.createUpload(avatarDest).single('avatar'), (req, res) => {
    const filename = res.req.file.filename
    return res.status(200).json({status: "avatar upload successful!", filename: filename})
})

/* POST request to upload a product picture to backend */
router.post('/api/upload/product', upload.createUpload(productDest).single('product'), (req, res) => {
    const filename = res.req.file.filename
    return res.status(200).json({status: "product image upload successful!", filename: filename})
})

module.exports = router