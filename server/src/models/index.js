const mongoose = require('mongoose')
const config = require('../config')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    address: String,
    cart: [ 
        {
            productid: {type: mongoose.Types.ObjectId, ref: "Product"},
            quantity: Number
        }
    ],
    avatar: String
})

userSchema.set('toJSON' , {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Session = mongoose.model("Session", userSchema)

const sellerSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    companyName: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    address: String,
    logo: String
})

sellerSchema.set('toJSON' , {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Seller = mongoose.model("Seller", sellerSchema)

const productSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    price: {type: Number, required: true},
    description: String,
    quantity: {type: Number, required: true},
    picture: String,
    seller: {type: mongoose.Types.ObjectId, ref: "Seller", required: true},
})

productSchema.set('toJSON' , {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Product = mongoose.model("Product", productSchema)


const startDb = () => {
    mongoose.connect(config.mongoDBUrl)
            .then(result => {
                console.log('connected to database on port:', config.port)
                console.log("on mongoURL", config.mongoDBUrl)
            })
            .catch(error => {
                console.log('error connecting to database:', error.message)
            })
}

module.exports = {
    Session,
    Seller,
    Product,
    startDb
}