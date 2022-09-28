const models = require('../models')
const auth = require('./auth')

/**
 * Adds productID to cart field of a user document in the database
 * @param {Object} request Object containing a params field that is a JSON object with key productid
 * @param {Object} response Object for returning json responses 
 * @returns 200 status on success, else 40x codes on errors
 */
const addToCart = async (request, response) => {
    const buyer = await auth.validateUser(request)
    if(buyer) {
        const user = await models.Session.findById(buyer)
        const itemToAdd = {
            product: request.params.productid,
            quantity: 1
        }
        const newCart = user.cart.concat(itemToAdd)
        user.cart = newCart
        await user.save()
            .catch(e => {
                response.status(400).json({error: "unable to add to cart", error: e})
            })
        return response.status(200).json({status: "successfully added item to cart", newCart: user.cart})
    }
    return response.status(401).json({error: "invalid user"})
}



module.exports = {addToCart}