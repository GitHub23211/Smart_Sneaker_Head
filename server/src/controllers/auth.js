const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require(`jsonwebtoken`)

const getUser = async (request, response) => {
    if(true) {
        try {
            const userid = request.body.user

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