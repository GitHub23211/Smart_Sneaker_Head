const models = require('../models')

const getProducts = async (request, response) => {
    const products = await models.Product.find({})
    return response.status(200).json({status: "success", products: products})
}

/**
 * Creates new product and puts it into the database
 * @param {Object} request - Object containing a body field that is a JSON object with 4 keys: name, price, description, quantity
 * @param {Object} response - Object used to send a json response.
 * @returns 200 status on success, 400 status if product exists, 401 status if unknown error or seller could not be validated
 */
const createProduct = async (request, response) => {
    const seller = request.user
    if(seller) {
        try {
            const newProduct = new models.Product({
                name: request.body.name,
                price: request.body.price,
                description: request.body.description,
                quantity: request.body.quantity,
                seller: seller
            })
    
            const saveProduct = await newProduct.save()
                
            if(saveProduct) {
                if(newProduct._id) {
                    return response.status(201).json({status: "success", product: newProduct})
                }
            }
        } catch {return response.status(401).json({error: "product already exists"})}
    }
}

/**
 * Update a product in the database given its ID and seller ID
 * @param {Object} request Object containing a body field that is a JSON object with 4 keys: name, price, description, quantity
 * Also contains a params field that is a JSON object with a productid key.
 * @param {Object} response Object used to send a json response.
 * @returns 200 status on success, 401 status if unknown error or is invalid seller
 */
const updateProduct = async (request, response) => {
    const seller = request.user
    if(seller) {
        try {
            const filter = {_id: request.params.productid, seller: seller}
            const updatedProduct = {
                name: request.body.name,
                price: request.body.price,
                description: request.body.description,
                quantity: request.body.quantity
            }
            const productToUpdate = await models.Product.findOneAndUpdate(filter, updatedProduct)
            if(productToUpdate) {
                return response.status(200).json({status: "successfully updated product", before: productToUpdate, after: updatedProduct})
            }
            throw new Error("Not the original seller or product no longer exists")
        } catch(e) {
            if(e.keyPattern && e.keyPattern.name) {
                return response.status(400).json({error: "product with that name already exists"})
            }
            else if(e.name === "CastError") {
                return response.status(400).json({error: "invalid productid"})
            }
            return response.status(401).json({error: e.toString()})
        }
    }
    return response.status(401).json({error: "invalid seller"})
}

/**
 * Delete a product in the database given its ID and seller ID
 * @param {Object} request Object with a params field that is a JSON object with a productid key.
 * @param {Object} response Object used to send a json response.
 * @returns 200 status on success, 401 status if unknown error or is invalid seller
 */
const deleteProduct = async (request, response) => {
    const seller = request.user
    if(seller) {
        try {
            const filter = {_id: request.params.productid, seller: seller}
            const productToDelete = await models.Product.find(filter)
            if(productToDelete.length > 0) {
                await models.Product.deleteOne(filter)
                return response.status(200).json({status: "successfully deleted product", product: productToDelete})
            }
            throw new Error("Not the original seller or product no longer exists")
        } catch(e) {
            if(e.name === "CastError") {
                return response.status(400).json({error: "invalid productid"})
            }
            return response.status(401).json({error: e.toString()})
        }
    }
    return response.status(401).json({error: "invalid seller"})
}

module.exports = {getProducts, createProduct, updateProduct, deleteProduct}