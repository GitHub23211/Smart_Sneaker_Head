const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user_routes')
const sellerRoutes = require('./routes/seller_routes')
const authRoutes = require('./routes/auth_routes')
const upload = require('./routes/upload_routes')
const verification = require('./middleware/auth')


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/user/image', express.static('./server/src/pictures/avatars'))
app.use('/logo/image', express.static('./server/src/pictures/logos'))
app.use('/product/image', express.static('./server/src/pictures/products'))
app.use('/', authRoutes)
app.use(verification.verifyUser)
app.use('/', userRoutes)
app.use('/', upload)
app.use(verification.verifySeller)
app.use('/', sellerRoutes)


module.exports = app