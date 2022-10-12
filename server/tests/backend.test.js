const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const models = require('../src/models')
const config = require('../src/config')


const api = supertest(app)

beforeAll(async () => {
    try {
        await mongoose.disconnect()
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
    } catch(e) {console.log("error occured", e.toString())}

})

describe("Testing auth API endpoints", () => {

    test("register user", async () => {
        const data = {
            username: "test",
            password: "123",
            email: "test@test"
        }
    
        const response = await api.post("/auth/register/user")
                                  .send(data)
    
        expect(response.status).toBe(201)
        expect(response.body.status).toBe('success')
        expect(response.body.token).not.toBeNull()
    })

})

describe("Testing product API endpoints", () => {

    test("get product returns 200 even without query", async () => {
        await api.get('/api/product')
                .expect(200)
    })

})

describe("Testing cart API endpoints", () => {

})

describe("Testing user API endpoints", () => {
    
})

afterAll(async () => {
    await mongoose.connection.close()
})