const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require(`jsonwebtoken`)
const config = require('../config')
const axios = require('axios')

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
                response.cookie('token', token, {httpOnly: true, maxAge: 3600000})
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
    const {username, password, email, address, companyName, abn} = request.body
    const validABN = await validateABN(abn)
    
    if(validABN) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const checkEmail = await models.Session.find({email: {$regex: `^${email}$`, $options: 'im'}})
        if(checkEmail.length === 0) {
            const seller = new models.Seller({
                username: username,
                password: hashedPassword,
                email: email,
                address: address,
                companyName: companyName,
                abn: abn,
                logo: ""
            })
        
            try {
                const saveSeller = await seller.save()
            
                if(saveSeller) {
                    if(seller._id) {
                        const token = encodeToken(seller._id, saveSeller.username)
                        response.cookie('token', token, {httpOnly: true, maxAge: 3600000})
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
                if(e.keyValue.abn) {
                    return response.status(400).json({error: "abn already taken"}) 
                }
                return response.status(400).json({error: "email already taken"})
            }
        }
        return response.status(400).json({error: "email already taken"})
    }
    return response.status(400).json({error: "invalid ABN"})
}

/**
 * Validates ABN given from seller register request
 * @param {String} abn ABN found in request body
 * @returns true if ABN is valid, false otherwise
 */
const validateABN = async (abn) => {
    const headers = {
        params: {
            abn: abn,
            guid: config.guid
        }
    }
    const response = await axios.get('https://abr.business.gov.au/json/AbnDetails.aspx', headers)
    const jsonString = response.data.slice(9, response.data.length - 1)
    const data = JSON.parse(jsonString)
    if(data.Message === '') {
        return true
    }
    return false
}

/**
 * Gets user information from database using user token
 * @param {Object} request - JSON Object containing headers with the user's token
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object with user's information if successful, otherwise errors
 */
const getUser = async (request, response) => {
    try {
        const userid = request.user
        const user = await models.Session.findById(userid)
        if(user) {
            return response.status(200).json({
                status: "success",
                id: user._id,
                username: user.username,
                email: user.email,
                address: user.address,
                cart: user.cart,
                wishlist: user.wishlist,
                avatar: user.avatar
            })
        }
    }
    catch {return response.status(401).json({error: "missing or invalid token"})}
    return response.status(400).json({error: 'unregistered or accessing user info with seller account'})
}

const getAUser = async (request, response) => {

    try {
        const userid = request.params.userid
        const user = await models.Session.findById(userid)

        if(user) {
            return response.status(200).json({status: "success", user: user.username})
        }
        else {
            return response.status(401).json({error: "could not find user"})
        }

    } catch (e) {return response.status(401).json({error: e.toString()})}
}

/**
 * Gets user information from database using seller token
 * @param {Object} request - JSON Object containing headers with the seller's token
 * @param {Object} response - Object used to send a json response.
 * @returns {Object} JSON object with seller's information if successful, otherwise errors
 */
 const getSeller = async (request, response) => {
    try {
        const sellerid = request.user
        const seller = await models.Seller.findById(sellerid)
        if(seller) {
            return response.status(200).json({
                status: "success",
                id: seller._id,
                username: seller.username,
                email: seller.email,
                address: seller.address,
                companyName: seller.companyName,
                abn: seller.abn,
                logo: seller.logo
            })
        }
    }
    catch {return response.status(401).json({error: "missing or invalid token"})}
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
    if(username && password) {
        const user = await loginHelper(username)
        if(!user) {
            return response.status(401).json({error: "invalid username or password"})
        }
    
        if(await bcrypt.compare(password, user.password)) {
            const token = encodeToken(user._id, user.username)
            response.cookie('token', token, {httpOnly: true, maxAge: 3600000})
            return response.status(200).json({status: "success", token: token})
        }
    }
    return response.status(401).json({error: "username or password missing or invalid"})
}

/**
 * Figures out whether the given credentials are for a user, a seller, or if they are invalid.
 * @param {String} username username of user or seller
 * @returns the user or seller in the database or false if cannot be found/are invalid.
 */
const loginHelper = async (username) => {
    const user = await models.Session.findOne({username: username})
    if(!user) {
        const seller = await models.Seller.findOne({username: username})
        if(!seller) {
            return false
        }
        return seller
    }
    return user
}

/**
 * Sets cookies to none with a max life of 5 seconds to log out user from site
 * @param {Object} request contains Cookie header
 * @param {Object} response - Object used to send a json response.
 * @returns 200 status code
 */
const logoutUser = async (request, response) => {
    response.cookie('token', 'none', {maxAge: 5000, httpOnly: true})
    return response.status(200).json({status: 'success'})
}

/**
 * Function used to check if user is valid before allowing them to perform significant changes to the site
 * @param {Object} request - JSON Object containing headers with the user's token
 * @returns {Boolean} returns user's id if valid user which is equivalent to true, otherwise returns false
 */
const validateUser = async (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET)
        const userid = decodedToken.id
        const user = await models.Session.findOne({_id: userid})
        if (user) {
            return user._id
        }
        else {
            const seller = await models.Seller.findOne({_id: userid})
            if (seller) {
                return seller._id
            }
        }
    }
    catch {return false}
}

module.exports = {
    getUser,
    getAUser,
    createUser,
    loginUser,
    validateUser,
    logoutUser, 
    createSeller, 
    getSeller
}