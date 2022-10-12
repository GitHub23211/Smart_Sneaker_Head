require('dotenv').config()

const mongoDBUrl = process.env.MONGODB_URL
const mongoDBUrlTest = process.env.MONGODB_URL_TEST
const port = process.env.PORT
const secret = process.env.SECRET_TOKEN
const nodeEnv = process.env.NODE_ENV

module.exports = {mongoDBUrl, port, secret, mongoDBUrlTest, nodeEnv}