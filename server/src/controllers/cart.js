const models = require('../models')
const auth = require('./auth')

/**
 * Adds productID to cart field of a user document in the database
 * @param {Object} request Object containing a body field that is a JSON object with two keys: productid and quantity
 * @param {Object} response Object for returning json responses 
 * @returns 200 status on success with the users cart, else 40x codes on errors
 */
const addToCart = async (request, response) => {
    const buyer = await auth.validateUser(request)

    if(buyer) {
        const user = await models.Session.findById(buyer)
        const productid = request.body.productid

        const itemInCart = user.cart.some(product => product.productid.toString() === productid)
        if(!itemInCart) {
            const itemToAdd = {
                productid: productid,
                quantity: request.body.quantity
            }
            const newCart = user.cart.concat(itemToAdd)

            user.cart = newCart

            await user.save()
            .catch(e => {
                response.status(400).json({error: "unable to add to cart", error: e})
            })
            return response.status(200).json({status: "successfully added item to cart", newCart: user.cart})
        }
        else {
            return response.status(400).json({error: "item already in cart"})
        }

    }
    return response.status(401).json({error: "invalid user"})
}

/**
 * Updates the quantity of a given item in a cart
 * @param {Object} request Object containing a body field that is a JSON object with two keys: productid and quantity
 * @param {Object} response Object for returning json responses 
 * @returns 200 status on success with the users cart, else 40x codes on errors
 */
 const updateQuantity = async (request, response) => {
    const buyer = await auth.validateUser(request)

    if(buyer) {
        const user = await models.Session.findById(buyer)
        const productToUpdate = request.body.productid
        const itemIndex = user.cart.findIndex(item => item.productid.toString() === productToUpdate)

        if(itemIndex > -1) {
            user.cart[itemIndex].quantity = request.body.quantity
            await user.save()
            .catch(e => {
                response.status(400).json({error: "unable to update quantity", error: e})
            })
            return response.status(200).json({status: "successfully updated item quantity", newCart: user.cart})
        }
        return response.status(400).json({error: "could not find item to update"})
    }
    return response.status(401).json({error: "invalid user"})
}

/**
 * Deletes item from cart
 * @param {Object} request Object containing a params field that is a JSON object with key productid
 * @param {Object} response Object for returning json responses 
 * @returns 200 status on success with the users cart, else 40x codes on errors
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

module.exports = {addToCart, deleteFromCart, updateQuantity}