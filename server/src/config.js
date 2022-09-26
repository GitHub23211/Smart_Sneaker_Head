require('dotenv').config()

const mongoDBUrl = process.env.MONGODB_URL
const port = process.env.PORT

module.exports = {mongoDBUrl, port}