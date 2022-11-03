const models = require('../models')

/**
 * Adds productID to cart field of a user document in the database
 * @param {Object} request Object containing a body field that is a JSON object with two keys: productid and quantity
 * @param {Object} response Object for returning json responses 
 * @returns 200 status on success with the users cart, else 40x codes on errors
 */
const addToCart = async (request, response) => {
    const buyer = request.user

    if(buyer) {
        try {
            const user = await models.Session.findById(buyer)
            const productid = request.params.productid

            const itemInCart = user.cart.some(product => product.productid.toString() === productid)
            if(!itemInCart) {
                const itemToAdd = {
                    productid: productid,
                    quantity: request.body.quantity
                }
                const newCart = user.cart.concat(itemToAdd)

                user.cart = newCart

                await user.save()

                return response.status(200).json({status: "success", cart: user.cart})
            }
            return response.status(400).json({error: "item already in cart"})
        } catch(e) {return response.status(400).json({error: e})}
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
    const buyer = request.user

    if(buyer) {
        try {
            const user = await models.Session.findById(buyer)
            const productToUpdate = request.params.productid
            const itemIndex = user.cart.findIndex(item => item.productid.toString() === productToUpdate)
    
            if(itemIndex > -1) {
                user.cart[itemIndex].quantity = request.body.quantity
    
                await user.save()
                return response.status(200).json({status: "success", cart: user.cart})
            }
            return response.status(400).json({error: "could not find item to update"})
        } catch(e) {return response.status(401).json({error: e})}
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
    const buyer = request.user

    if(buyer) {
        try {
            const productToDelete = request.params.productid
            const user = await models.Session.findById(buyer)
            const itemInCart = user.cart.some(item => item.productid.toString() === productToDelete)
            if(itemInCart){
                const newCart = user.cart.filter(item => item.productid.toString() !== productToDelete)
                user.cart = newCart

                await user.save()

                return response.status(200).json({status: "success", cart: user.cart})
            }
            throw new Error("product not in cart or invalid productid")
        } catch(e) {return response.status(401).json({error: e.toString()})}
    }
    return response.status(401).json({error: "invalid user"})
}

const clearCart = async (request, response) => {

    const buyer = request.user

    try {
        const user = await models.Session.findById(buyer)
        user.cart = []
        await user.save()
        return response.status(200).json({status: "success", cart: user.cart})
    } catch (e) {return response.status(401).json({error: e.toString()})}
}

module.exports = {addToCart, deleteFromCart, updateQuantity, clearCart}