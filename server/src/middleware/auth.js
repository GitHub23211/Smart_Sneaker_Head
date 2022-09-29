const auth = require('../controllers/auth')

const authenticate = (request, response, next) => {
    auth.validateUser(request)
    .then(user => {
        if(user) {
            request.user = user
            return next()
        }
        throw new Error("invalid user")
    })
    .catch(e => response.status(401).json({error: e}))
}

module.exports = {authenticate}