const mongoose = require('mongoose')
const models = require('../src/models')
const config = require('../src/config')

beforeAll(async () => {
    try {
        await mongoose.disconnect()
        await mongoose.connect(config.mongoDBUrlTest)
        console.log('connected to database on port:', config.port)
        console.log("on mongoURL", config.mongoDBUrlTest)
        await models.Session.deleteMany({})
        console.log("Deleted all users")
        await models.Seller.deleteMany({})
        console.log("Deleted all sellers")
        await models.Product.deleteMany({})
        console.log("Deleted all products")
    } catch(e) {console.log("error occured", e.toString())}
})

afterAll(async () => {
    try {
        await mongoose.connection.close()
    } catch(e) {console.log("tried to close connection but got error:", e.toString())}
})
