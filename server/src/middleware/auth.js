const auth = require('../controllers/auth')
const models = require('../models')

/**
 * Verifies user is a valid user in the database
 * @param {Object} request Object containing Authorization token
 * @param {Object} response Object for returning json responses 
 * @param {Function} next Callback argument to continue middleware execution
 * @returns Passes control to next middleware that contains routes that require a verified user, else returns error.
 */
const verifyUser = async (request, response, next) => {
    const user = await auth.validateUser(request)
    if(user) {
        request.user = user
        next()
    }
    else {
        return response.status(401).json({error: "invalid user"})
    }
}

const verifySeller = async(request, response, next) => {
    const user = await models.Seller.findOne({_id: request.user})
    if(user) {
        next()
    }
    else {
        return response.status(401).json({error: "invalid seller"})
    }
}

module.exports = {verifyUser, verifySeller}