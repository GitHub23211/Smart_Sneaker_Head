const mongoose = require('mongoose')
const config = require('../config')

const sessionSchema = new mongoose.Schema({
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
    quantity: Number,
    seller: {type: mongoose.Types.ObjectId, ref: "Session"},
    picture: String
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
    Product,
    startDb
}