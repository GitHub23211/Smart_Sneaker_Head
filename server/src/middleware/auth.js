const auth = require('../controllers/auth')

/**
 * Verifies user is a valid user in the database
 * @param {Object} request Object containing Authorization token
 * @param {Object} response Object for returning json responses 
 * @param {Function} next Callback argument to continue middleware execution
 * @returns Passes control to next middleware which contains routes that require a verified user, else returns error.
 */
const authenticate = async (request, response, next) => {
    const user = await auth.validateUser(request)
    if(user) {
        request.user = user
        return next()
    }
    return response.status(401).json({error: "invalid user"})
}

module.exports = {authenticate}