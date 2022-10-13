const mongoose = require('mongoose')
const models = require('../src/models')
const config = require('../src/config')

module.exports = async () => {
    try {
        await mongoose.connect(config.mongoDBUrlTest)
        console.log('connected to database on port:', config.port)
        console.log("on mongoURL", config.mongoDBUrlTest)
        console.log("Resetting database....")
        await models.Session.deleteMany({})
        console.log("Deleted all users")
        await models.Seller.deleteMany({})
        console.log("Deleted all sellers")
        await models.Product.deleteMany({})
        console.log("Deleted all products")
        await mongoose.disconnect()
    } catch(e) {console.log("error occured", e.toString())}
}