const models = require('../models')
const auth = require('./auth')

/**
 * Creates new product to put into database
 * @param {Object} request - Object containing a body field that is a JSON object with 4 keys: name, price, description, quantity
 * @param {Object} response - Object used to send a json response.
 */
const createProduct = async (request, response) => {
    const seller = await auth.validateUser(request)
    if(seller) {
        try {
            const newProduct = new models.Product({
                name: request.body.name,
                price: request.body.price,
                description: request.body.description,
                quantity: request.body.quantity
            })

            const saveProduct = await newProduct.save()
                .catch(e => {
                    response.status(400).json({error: "product already exists"})
                })
                
            if(saveProduct) {
                if(newProduct._id) {
                    return response.status(200).json({status: "success", product: newProduct})
                }
            }
        } catch {response.status(401).json({error: "invalid user"})}
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