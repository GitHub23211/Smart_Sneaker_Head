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
            
        } catch {response.status(400).status({"error": "invalid user"})}
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