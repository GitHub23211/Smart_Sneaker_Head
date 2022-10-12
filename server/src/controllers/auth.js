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
 * Creates user to post to database
 * @function
 * @param {Object} request - Object containing a body field that is a JSON object with the required keys
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object containing status and registered user's token if successful, otherwise a JSON containing an error.
 */
const createUser = async (request, response) => {
    const {username, password, email, address} = request.body

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = new models.Session({
        username: username,
        password: hashedPassword,
        email: email,
        address: address,
        avatar: ""
    })

    try {
        const saveUser = await user.save()
    
        if(saveUser) {
            if(user._id) {
                const token = encodeToken(user._id, saveUser.username)
                return response.status(201).json({status: "success", token: token})
            }
        }
    } catch(e) {
        if(e.name.toLowerCase() === "validationerror") {
            return response.status(400).json({error: e.message})
        }
        if(e.keyValue.username) {
            return response.status(400).json({error:"username already taken"})
        }
        return response.status(400).json({error: "email already taken"})
    }
}

/**
 * Creates seller to post to database
 * @function
 * @param {Object} request - Object containing a body field that is a JSON object with the required keys
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object containing status and registered seller's token if successful, otherwise a JSON containing an error.
 */
 const createSeller = async (request, response) => {
    const {username, password, email, address, companyName} = request.body

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const seller = new models.Seller({
        username: username,
        password: hashedPassword,
        email: email,
        address: address,
        companyName: companyName,
        logo: ""
    })

    try {
        const saveSeller = await seller.save()
    
        if(saveSeller) {
            if(seller._id) {
                const token = encodeToken(seller._id, saveSeller.username)
                return response.status(201).json({status: "success", token: token})
            }
        }
    } catch(e) {
        if(e.name.toLowerCase() === "validationerror") {
            return response.status(400).json({error: e.message})
        }
        if(e.keyValue.username) {
            return response.status(400).json({error: "username already taken"})
        }
        if(e.keyValue.companyName) {
            return response.status(400).json({error: "company name already taken"})
        }
        return response.status(400).json({error: "email already taken", e: e, string:e.toString()})
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
                return response.status(200).json({
                    status: "success",
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        address: user.address,
                        cart: user.cart,
                        avatar: user.avatar
                    }
                })
            }
        }
        catch {return response.status(401).json({error: "missing or invalid token"})}
    }
    return response.status(400).json({error: "unregistered"})
}

/**
 * Gets user information from database using seller token
 * @param {Object} request - JSON Object containing headers with the seller's token
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object with seller's information if successful, otherwise errors
 */
 const getSeller = async (request, response) => {
    const authHeader = request.get('Authorization')
    if(authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(authHeader.substring(7), SECRET)
        try {
            const userid = decodedToken.id
            const seller = await models.Seller.findById(userid)
            if(seller) {
                return response.status(200).json({
                    status: "success",
                    user: {
                        id: seller._id,
                        username: seller.username,
                        email: seller.email,
                        address: seller.address,
                        companyName: seller.cart,
                        logo: seller.logo
                    }
                })
            }
        }
        catch {return response.status(401).json({error: "missing or invalid token"})}
    }
    return response.status(400).json({error: "unregistered"})
}

/**
 * Function that logs user into the site
 * @param {Object} request - Object containing a body field that holds a JSON object with two keys: username and password.
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object containing status and user's token if successful, otherwise errors
 */
const loginUser = async (request, response) => {
    const {username, password} = request.body
    const user = await models.Session.findOne({username: username})
    if(!user) {
        return response.status(401).json({status: "invalid username or password"})
    }

    if(await bcrypt.compare(password, user.password)) {
        const token = encodeToken(user._id, user.username)
        return response.status(200).json({status: "success", token: token})
    }
    return response.status(401).json({status: "invalid username or password"})
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
        catch {return false}
    }
    return false
}

module.exports = {getUser, createUser, loginUser, validateUser, createSeller, getSeller}