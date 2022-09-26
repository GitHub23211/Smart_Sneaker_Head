require('dotenv').config()

const mongoDBUrl = process.env.MONGODB_URL
const port = process.env.PORT
const secret = process.env.SECRET_TOKEN

module.exports = {mongoDBUrl, port, secret}