const express = require('express')
const auth = require('./controllers/auth')

const router = express.Router()

router.get('/', (request, response) => response.send("<h1>Hello World</h1>"))

/* GET request that returns currently logged in user */
router.get('/auth/', auth.getUser)

/* POST request that registers user to website */
router.post('/auth/register', auth.createUser)

/* POST request to log user into website */
router.post(`/auth/login`, auth.loginUser)


module.exports = router 