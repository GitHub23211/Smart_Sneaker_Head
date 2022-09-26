const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require(`jsonwebtoken`)
const config = require('../config')

const SECRET = config.secret

/**
 * Helper function to encode a token from user information
 * @function
 * @param {String} id - user's id 
 * @param {String} username - user's usernane
 * @returns {String} user's unique token
 */
const encodeToken = (id, username) => {
    const userForToken = {
        id: id,
        username: username
    }
    return jwt.sign(userForToken, SECRET)
}

/**
 * Helper function to encode a token from user information
 * @function
 * @param {String} password - plain text password to hash
 * @returns {String} hashed password
 */
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
                .then(response => response)
}


/**
 * Creates user to post to database
 * @function
 * @param {Object} request - Object containing a body field that holds a JSON object with two keys: username and password.
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object containing status and registered user's token if successful, otherwise a JSON containing an error.
 */
const createUser = async (request, response) => {
    const password = await hashPassword(request.body.password)
    const user = new models.Session({
        username: request.body.username,
        password: password
    })

    const saveUser = await user.save()
        .catch(e => {
            response.json({error: "username taken"})
        })
        
    if(saveUser) {
        if(user._id) {
            const token = encodeToken(user._id, saveUser.username)
            return response.status(200).json({status: "success", token: token})
        }
    }
}

/**
 * Gets user information from database using user token
 * @param {Object} request - JSON Object containing headers with the user's token
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object with user's information if successful, otherwise errors
 */
const getUser = async (request, response) => {
    const authHeader = request.get('Authorization')
    if(authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(authHeader.substring(7), SECRET)
        try {
            const userid = decodedToken.id
            const user = await models.Session.findById(userid)
            if(user) {
                response.json({
                    status: "success",
                    id: user._id,
                    username: user.username
                })
            }
        }
        catch {response.json({error: "missing or invalid token"})}
    }
    return response.json({error: "unregistered"})
}

/**
 * Function that logs user into the site
 * @param {Object} request - Object containing a body field that holds a JSON object with two keys: username and password.
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object containing status and user's token if successful, otherwise errors
 */
const loginUser = async (request, response) => {
    const username = request.body.username
    const password = request.body.password
    const user = await models.Session.findOne({username: username})
    if(!match) {
        return response.json({status: "invalid username or password"})
    }

    if(await bcrypt.compare(password, user.password)) {
        const token = encodeToken(user._id, user.username)
        return response.status(200).json({status: "success", token: token})
    }
    return response.json({status: "invalid username or password"})
}

/**
 * Function used to check if user is valid before allowing them to perform significant changes to the site
 * @param {Object} request - JSON Object containing headers with the user's token
 * @returns {Boolean} returns user's id if valid user which is equivalent to true, otherwise returns false
 */
const validateUser = async (request) => {
    const authHeader = request.get('Authorization')
    if(authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        try {
            const decodedToken = jwt.verify(authHeader.substring(7), SECRET)
            const userid = decodedToken.id     
            const user = await models.Session.findOne({_id: userid})  
            if (user) {
                return user._id
            }
        }
        catch {response.json({status: "missing or invalid token"})}
    }
    return false
}

module.exports = {getUser, createUser, loginUser, validateUser}