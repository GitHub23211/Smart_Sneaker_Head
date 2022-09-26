const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require(`jsonwebtoken`)
const config = require('../config')

const SECRET = config.secret

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

/* 
 * loginUser - Checks if the username and password in the request
 *   body contains a valid user according to the database.
 *   return the user's token if match, else send an error.
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

/* 
 * validUser - check for a valid user via Authorization header
 *   return user's id if found, false if not
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

/* Helper function to encode a token from user information */
const encodeToken = (id, username) => {
    const userForToken = {
        id: id,
        username: username
    }
    return jwt.sign(userForToken, SECRET)
}

/* Helper function that returns a password hashed by bcrypt */
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
                .then(response => response)
}
module.exports = {getUser, createUser, loginUser, validateUser}