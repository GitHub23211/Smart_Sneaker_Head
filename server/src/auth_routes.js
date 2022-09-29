const express = require('express')
const auth = require('./controllers/auth')

const router = express.Router()

router.get('', auth.getUser)

/* POST request that registers user to website */
router.post('/register', auth.createUser)

/* POST request to log user into website */
router.post(`/login`, auth.loginUser)

module.exports = router