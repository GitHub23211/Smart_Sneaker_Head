const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes')
const auth = require('./auth_routes')
const verifyUser = require('./middleware/auth')
const upload = require('./middleware/upload')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/image', express.static('./server/src/pictures'))
app.use('/', upload)
app.use('/', router)
app.use(verifyUser.authenticate)
app.use('/', auth)

module.exports = app