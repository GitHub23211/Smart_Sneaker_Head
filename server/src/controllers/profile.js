const models = require('../models')
const bcrypt = require('bcrypt')

const updateProfile = async (request, response) => {
    const user = request.user
    if(user) {
        try{
            const {username, password, email, address} = request.body
            const updatedInfo = {
                username: username,
                password: password,
                email:email,
                address: address
            }

            if(password) {
                await bcrypt.hash(password, 10)
                            .then(response => updatedInfo.password = response)
            }

            const userToUpdate = await models.Session.findByIdAndUpdate(user, updatedInfo)

            if(userToUpdate) {
                return response.status(200).json({status: "successfully updated user profile", updatedInfo: updatedInfo})
            }
            
            throw new Error("User profile does not exist")
        }
        catch(e) {
            if(e.keyValue.username) {
                return response.status(400).json({error: "username already taken"})
            }
            else if(e.keyValue.email) {
                return response.status(400).json({error: "email already taken"})
            }
            return response.status(400).json({error: e.toString()})
        }
    }
    return response.status(401).json({error: "invalid user"})
}

module.exports = {updateProfile}
