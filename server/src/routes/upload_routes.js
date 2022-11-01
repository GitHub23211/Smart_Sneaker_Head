const express = require('express')
const upload = require('../middleware/upload')
const router = express.Router()

const avatarDest = './server/src/pictures/avatars'
const logoDest = './server/src/pictures/logos'
const productDest = './server/src/pictures/products'

/* POST request to upload user avatar to backend */
router.post('/api/upload/avatar', upload.createUpload(avatarDest).single('avatar'), (req, res) => {
    const filename = res.req.file.filename
    return res.status(200).json({status: "avatar upload successful", filename: filename})
})

/* POST request to upload company logo to backend */
router.post('/api/upload/logo', upload.createUpload(logoDest).single('logo'), (req, res) => {
    const filename = res.req.file.filename
    return res.status(200).json({status: "logo upload successful", filename: filename})
})

/* POST request to upload product picture to backend */
router.post('/api/upload/product', upload.createUpload(productDest).array('products'), (req, res) => {
    const filenames = res.req.files.map(file => file.filename)
    return res.status(200).json({status: "product images upload successful", filenames: filenames})
})

module.exports = router