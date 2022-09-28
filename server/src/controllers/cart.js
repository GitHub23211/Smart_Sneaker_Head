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
        const productid = request.params.productid

        const item = user.cart.findIndex(product => product.productid.toString() === productid)
        if(item > -1) {
            user.cart[item].quantity += 1
        }
        else {
            const itemToAdd = {
                productid: productid,
                quantity: 1
            }
            const newCart = user.cart.concat(itemToAdd)
            user.cart = newCart
        }

        await user.save()
            .catch(e => {
                response.status(400).json({error: "unable to add to cart", error: e})
            })

        return response.status(200).json({status: "successfully added item to cart", newCart: user.cart})
    }
    return response.status(401).json({error: "invalid user"})
}

/**
 * Deletes item from cart
 * @param {Object} request Object containing a params field that is a JSON object with key productid
 * @param {Object} response Object for returning json responses 
 * @returns 200 status on success, else 40x codes on errors
 */
const deleteFromCart = async (request, response) => {
    const buyer = await auth.validateUser(request)

    if(buyer) {

        const productToDelete = request.params.productid
        const user = await models.Session.findById(buyer)
        const newCart = user.cart.filter(item => item.productid.toString() != productToDelete)
        user.cart = newCart

        await user.save()
            .catch(e => {
                response.status(400).json({error: "unable to delete from cart", error: e})
            })

        return response.status(200).json({status: "successfully deleted item from cart", newCart: user.cart})
    }
    return response.status(401).json({error: "invalid user"})
}

module.exports = {addToCart, deleteFromCart}