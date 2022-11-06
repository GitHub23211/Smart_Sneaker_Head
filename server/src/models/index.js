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
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    wishlist: [ 
        {
            productid: {type: mongoose.Types.ObjectId, ref: "Product"}
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
    abn: {type: String, unique: true, required: true},
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
    brand: String,
    pictures: {
        mainView: String,
        secondView: String,
        thirdView: String,
    },
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

const reviewSchema = new mongoose.Schema({
    title: String,
    contents: String,
    rating: Number,
    productid: {type: mongoose.Types.ObjectId, ref: "Product", required: true},
    reviewerid: {type: mongoose.Types.ObjectId, ref: "Session", required: true}
})

reviewSchema.set('toJSON' , {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

reviewSchema.index({productid: 1, reviewerid: 1}, {unique: true})

const Review = mongoose.model("Review", reviewSchema)

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
    Review,
    startDb
}