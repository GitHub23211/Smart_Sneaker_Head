const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes')
const auth = require('./auth_routes')
const verifyUser = require('./middleware/auth')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/', router)
app.use(verifyUser.authenticate)
app.use('/', auth)

module.exports = app