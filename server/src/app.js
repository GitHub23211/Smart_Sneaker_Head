const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const upload = require('./routes/upload_routes')
const routes = require('./routes/routes')
const authRoutes = require('./routes/auth_routes')
const verifyUser = require('./middleware/auth')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/user/image', express.static('./server/src/pictures/avatars'))
app.use('/product/image', express.static('./server/src/pictures/products'))
app.use('/', routes)
app.use(verifyUser.authenticate)
app.use('/', upload)
app.use('/', authRoutes)

module.exports = app