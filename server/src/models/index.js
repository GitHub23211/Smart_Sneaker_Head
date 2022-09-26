const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,

})

sessionSchema.set('toJSON' , {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Session = mongoose.model("Session", sessionSchema)

const productSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    price: Number,
    description: String,
    quantity: String
})

productSchema.set('toJSON' , {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Product = mongoose.model("Product", productSchema)


module.exports = {
    Session,
    Product
}