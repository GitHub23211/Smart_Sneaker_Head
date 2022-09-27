const models = require('../models')
const auth = requre('./auth')

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
const createProduct = async (request, response) => {
    const seller = await auth.validateUser(request)
    if(seller) {
        try {
            const newProduct = {
                name: request.body.name,
                price: request.body.price,
                description: request.body.descrption,
                quantity: request.body.quantity
            }

            const saveProduct = newProduct.save()
                .catch(e => response.json({error: "product already exists"}).status(400))
            
            if(saveProduct) {
                if(newProduct._id) {
                    return response.json({status: "success", product: newProduct}).status(200)
                }
            }

        } catch {response.json({error: "invalid user"}).status(401)}
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
const updateProduct = async (request, response) => {

}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
const deleteProduct = async (request, response) => {

}

module.exports = {createProduct, updateProduct, deleteProduct}