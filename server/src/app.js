const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const upload = require('./routes/upload_routes')
const router = require('./routes/routes')
const auth = require('./routes/auth_routes')
const verifyUser = require('./middleware/auth')

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