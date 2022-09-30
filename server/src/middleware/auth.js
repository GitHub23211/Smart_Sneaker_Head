const auth = require('../controllers/auth')

const authenticate = async (request, response, next) => {
    const user = await auth.validateUser(request)
    if(user) {
        request.user = user
        return next()
    }
    return response.status(401).json({error: "invalid user"})
}

module.exports = {authenticate}