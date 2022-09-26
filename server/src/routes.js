const express = require('express')
const auth = require('./controllers/auth')

const router = express.Router()

router.get('/', (request, response) => response.send("<h1>Hello World</h1>"))

/* GET request that returns currently logged in user */
router.get('/auth/', auth.getUser)

/* POST request that registers user information to database */
router.post('/auth/register', auth.createUser)

module.exports = router 