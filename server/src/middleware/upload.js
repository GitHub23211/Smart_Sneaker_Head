const multer = require('multer')

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

module.exports = {createUpload}