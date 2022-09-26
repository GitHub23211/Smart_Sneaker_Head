const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require(`jsonwebtoken`)

const SECRET = "secretcode"

/* Helper function to encode a token from user information */
const encodeToken = (id, username) => {
    const userForToken = {
        id: id,
        username: username
    }
    return jwt.sign(userForToken, SECRET)
}


const createUser = async (request, response) => {

    let password = ""
    await bcrypt.hash(request.body.password, 10)
                .then(response => password = response)
    
    const user = new models.Session({
        username: request.body.username,
        password: password
    })

    const saveUser = await user.save()
        .catch(error => response.json({error: "username taken"}))
        
    if(saveUser) {
        if(user._id) {
            const token = encodeToken(session._id, returned.username)
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
    else {
        response.json({error: "unregistered"})
    }
}

module.exports = {getUser, createUser}