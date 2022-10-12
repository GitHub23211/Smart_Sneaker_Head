const mongoose = require('mongoose')
const config = require('../config')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
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
    username: {type: String, unique: true},
    password: String,
    name: {type: String, unique: true},
    email: {type: String, unique: true},
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
    name: {type: String, unique: true},
    price: Number,
    description: String,
    quantity: Number,
    picture: String,
    seller: {type: mongoose.Types.ObjectId, ref: "Seller"},
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

const startTestDb = () => {
    mongoose.connect(config.mongoDBUrlTest)
            .then(result => {
                console.log('connected to testing database on port:', config.port)
                console.log("on mongoURL", config.mongoDBUrlTest)
            })
            .catch(error => {
                console.log('error connecting to database:', error.message)
            })
}

module.exports = {
    Session,
    Seller,
    Product,
    startDb,
    startTestDb
}