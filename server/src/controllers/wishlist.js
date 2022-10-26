const models = require('../models')

/**
 * Adds productID to wishlist field of a user document in the database
 * @param {Object} request Object containing a body field that is a JSON object a productid key
 * @param {Object} response Object for returning json responses 
 * @returns 200 status on success with the user's wishlist, else 40x codes on errors
 */
const addToWishlist = async (request, response) => {
    const buyer = request.user

    if(buyer) {
        try {
            const user = await models.Session.findById(buyer)
            const productid = request.params.productid

            const itemInWishlist = user.wishlist.some(product => product.productid.toString() === productid)
            if(!itemInWishlist) {
                const itemToAdd = {
                    productid: productid
                }
                const newWishlist = user.wishlist.concat(itemToAdd)

                user.wishlist = newWishlist

                await user.save()

                return response.status(200).json({status: "success", wishlist: user.wishlist})
            }
            return response.status(400).json({error: "item already in wishlist"})
        } catch(e) {return response.status(400).json({error: e})}
    }
    return response.status(401).json({error: "invalid user"})
}

/**
 * Deletes item from wishlist
 * @param {Object} request Object containing a body field that is a JSON object a productid key
 * @param {Object} response Object for returning json responses 
 * @returns 200 status on success with the users wishlist, else 40x codes on errors
 */
const deleteFromWishlist = async (request, response) => {
    const buyer = request.user

    if(buyer) {
        try {
            const productToDelete = request.params.productid
            const user = await models.Session.findById(buyer)
            const itemInWishlist = user.wishlist.some(item => item.productid.toString() === productToDelete)
            if(itemInWishlist){
                const newWishlist = user.wishlist.filter(item => item.productid.toString() !== productToDelete)
                user.wishlist = newWishlist

                await user.save()

                return response.status(200).json({status: "success", wishlist: user.wishlist})
            }
            throw new Error("product not in wishlist or invalid productid")
        } catch(e) {return response.status(401).json({error: e.toString()})}
    }
    return response.status(401).json({error: "invalid user"})
}

module.exports = {addToWishlist, deleteFromWishlist}