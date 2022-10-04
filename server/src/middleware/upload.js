const express = require('express')
const multer = require('multer')
const router = express.Router()

const avatarDest = './server/src/pictures/users'
const productDest = './server/src/pictures/products'

const createStorage = (dest) => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, dest)
        },
        filename: function(req, file, cb) {
            const newFileName = Date.now() + " - " + file.originalname
            cb(null, newFileName)
        },
    })
    return storage
}

const createUpload = (dest) => {
    return multer({storage: createStorage(dest)})
}

router.post('/api/upload/avatar', createUpload(avatarDest).single('avatar'), (req, res) => {
    return res.status(200).json({status: "file upload successful!"})
})

router.post('/api/upload/product', createUpload(productDest).single('product'), (req, res) => {
    return res.status(200).json({status: "file upload successful!"})
})

module.exports = router