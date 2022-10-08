const multer = require('multer')

/**
 * Creates storage engine that saves file to dest
 * @param {String} dest Path to folder to save file to
 * @returns Storage engine for multer
 */
const createStorage = (dest) => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, dest)
        },
        filename: function(req, file, cb) {
            const newFileName = Date.now() + "-" + file.originalname
            cb(null, newFileName)
        },
    })
    return storage
}

/**
 * Creates a multer instance with storage engine that saves file to dest
 * @param {String} dest File path to pass to storage creation function
 * @returns Multer instance
 */
const createUpload = (dest) => {
    return multer({storage: createStorage(dest)})
}

module.exports = {createUpload}