const express = require('express')
const upload = require('../middleware/upload')
const router = express.Router()

const avatarDest = './server/src/pictures/avatars'
const productDest = './server/src/pictures/products'

router.post('/api/upload/avatar', upload.createUpload(avatarDest).single('avatar'), (req, res) => {
    return res.status(200).json({status: "file upload successful!"})
})

router.post('/api/upload/product', upload.createUpload(productDest).single('product'), (req, res) => {
    return res.status(200).json({status: "file upload successful!"})
})

module.exports = router