const mongoose = require('mongoose')
const models = require('../src/models')
const config = require('../src/config')

const supertest = require('supertest')
const app = require('../src/app')
const api = supertest(app)

const registerUser = async () => {
    const data = {
        username: "testproduct",
        password: "123",
        email: "product@testuser"
    }

    await api.post("/auth/register/user")
    .send(data)
    .expect(201)
}

const registerSeller = async (data) => {
    const response = await api.post("/auth/register/seller").send(data)
    expect(response.status).toBe(201)
}

const getSeller1Token = async () => {
    const data = {
        username: "testproductcompany",
        password: "123"
    }
    const response = await api.post("/auth/login").send(data)
    return response.body.token
}

const getSeller2Token = async () => {
    const data = {
        username: "testproductcompany2",
        password: "123"
    }
    const response = await api.post("/auth/login").send(data)
    return response.body.token
}

const setupDB = async () => {
    const seller1 = {
        username: "testproductcompany",
        password: "123",
        email: "company@product",
        companyName: "Company Product Test",
        abn: "44000019796"
    }

    const seller2 = {
        username: "testproductcompany2",
        password: "123",
        email: "company@product2",
        companyName: "Company Product Test 2",
        abn: "98724451651"
    }

    await registerSeller(seller1)
    await registerSeller(seller2)
    await registerUser()
    const token1 = await getSeller1Token()
    const token2 = await getSeller2Token()

    const products = [ 
        {
            name: "Sneakers",
            price: 300,
            description: "Some sneakers",
            quantity: 20
        },

        {
            name: "Shoes",
            price: 300,
            description: "Some shoes",
            quantity: 20
        },

        {
            name: "Rapid Force Anti Shoe",
            price: 300,
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vestibulum consequat tempor fringilla. Integer dignissim ac erat a malesuada.
                            Vivamus porttitor aliquam erat. Sed efficitur finibus orci ut consequat. 
                            Ut et placerat ligula, quis sodales mauris. Aenean tincidunt lectus ornare, cursus ex et, 
                            maximus dolor. Suspendisse faucibus tincidunt magna at pretium. Integer vitae convallis quam. 
                            Vestibulum euismod vehicula augue ac venenatis.`,
            quantity: 20
        }
    ]

    const otherProducts = [
        {
            name: "Other Sneakers",
            price: 100,
            description: "Some other sneakers",
            quantity: 5
        },

        {
            name: "Other Shoes",
            price: 2,
            description: "Some other shoes",
            quantity: 1
        },
    ]

    for(let i = 0; i < products.length; i++) {
        await api.post('/api/product/register').set('Cookie', `token=${token1}`).send(products[i])
    }

    for(let i = 0; i < otherProducts.length; i++) {
        await api.post('/api/product/register').set('Cookie', `token=${token2}`).send(otherProducts[i])
    }
}


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
        await setupDB()
        console.log("DB has been set up")
    } catch(e) {console.log("error occured", e.toString())}
}, 600000)

afterAll(async () => {
    try {
        await mongoose.connection.close()
    } catch(e) {console.log("tried to close connection but got error:", e.toString())}
})
