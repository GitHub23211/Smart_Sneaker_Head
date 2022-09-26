const express = require('express')
const auth = require('./controllers/auth')

const router = express.Router()

router.get('/', (request, response) => response.send("<h1>Hello World</h1>"))

router.get('/auth/', auth.getUser)

module.exports = router 