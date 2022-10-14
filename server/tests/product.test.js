const supertest = require('supertest')
const app = require('../src/app')

const api = supertest(app)

const registerSeller = async (data) => {
    const response = await api.post("/auth/register/seller").send(data)
    expect(response.status).toBe(201)
}

const getSellerToken = async (data) => {
    const response = await api.post("/auth/login").send(data)
    return response.body.token
}

const getSellerID = async (token) => {
    const response = await api.get('/auth/seller').set('Authorization', `Bearer ${token}`)
    return response.body.id
}

beforeAll(async () => {
    const seller1 = {
        username: "testproductcompany",
        password: "123",
        email: "company@product",
        companyName: "Company Product Test",
        abn: "0987654321"
    }

    const seller1login = {
        username: "testproductcompany",
        password: "123"
    }

    const seller2 = {
        username: "testproductcompany2",
        password: "123",
        email: "company@product2",
        companyName: "Company Product Test 2",
        abn: "09876543212"
    }

    const seller2login = {
        username: "testproductcompany2",
        password: "123"
    }

    await registerSeller(seller1)
    await registerSeller(seller2)
    const token1 = await getSellerToken(seller1login)
    const token2 = await getSellerToken(seller2login)

    const products =[ 
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

    try {
        products.forEach(async product => await api.post('/api/product/register').set('Authorization', `Bearer ${token1}`).send(product))
    }
    catch (e) {console.log("error occurred setting up products for tests in product.test.js", e.toString())}

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
        
    try {
        otherProducts.forEach(async product => await api.post('/api/product/register').set('Authorization', `Bearer ${token2}`).send(product))
    }
    catch (e) {console.log("error occurred setting up products for tests in product.test.js", e.toString())}
    
})

describe("Testing product API endpoints", () => {

    describe("Test create product", () => {

        test("create a product", async () => {
            const seller1login = {
                username: "testproductcompany",
                password: "123"
            }
            const token = await getSellerToken(seller1login)
            const sellerid = await getSellerID(token)

            const product = {
                name: "test",
                price: "250",
                description: "test product for database",
                quantity: 100
            }

            const response = await api.post('/api/product/register')
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(product)
            
            expect(response.status).toBe(201)
            expect(response.body.status).toBe("success")
            expect(response.body.product).not.toBeNull()
            expect(response.body.product).not.toBeUndefined()
            expect(response.body.product.name).toBe("test")
            expect(response.body.product.price).toBe(250)
            expect(response.body.product.description).toBe("test product for database")
            expect(response.body.product.quantity).toBe(100)
            expect(response.body.product.seller).toBe(sellerid)

        })

        test("create a product with bad token", async () => {
            const seller1login = {
                username: "testproductcompany",
                password: "123"
            }
            const token = await getSellerToken(seller1login)
            const product = {
                name: "test1",
                price: "250",
                description: "test product for database",
                quantity: 100
            }

            const response = await api.post('/api/product/register')
                                      .set('Authorization', `Bearer ${token}bad token data`)
                                      .send(product)
            
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
            expect(response.body.product).toBeUndefined()
        })

        test("Create a product with no token", async () => {
            const product = {
                name: "test1",
                price: "250",
                description: "test product for database",
                quantity: 100
            }

            const response = await api.post('/api/product/register')
                                      .send(product)
            
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
            expect(response.body.product).toBeUndefined()
        })

        test("User tries to create a product", async () => {
            let token = ""

            const data = {
                username: "testproduct",
                password: "123",
                email: "product@testuser"
            }

            await api.post("/auth/register/user")
            .send(data)
            .expect(201)
            .expect(response => {
                expect(response.body.status).toBe("success")
                expect(response.body.token).not.toBeNull()
                expect(response.body.token).not.toBeUndefined()
                token = response.body.token
            })

            const product = {
                name: "test",
                price: "250",
                description: "test product for database",
                quantity: 100
            }

            const response = await api.post('/api/product/register')
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(product)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid seller")
            expect(response.body.product).toBeUndefined()
        })

        test("Create a duplicate product", async () => {
            const seller1login = {
                username: "testproductcompany",
                password: "123"
            }
            const token = await getSellerToken(seller1login)

            const product = {
                name: "test",
                price: "250",
                description: "test product for database",
                quantity: 100
            }

            const response = await api.post('/api/product/register')
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(product)
            
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("product already exists")
            expect(response.body.product).toBeUndefined()
        })
    })

    describe("Test get product", () => {

        test("get product returns 200 without query", async () => {
            const response = await api.get('/api/product')

            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.products).toHaveLength(6)
            expect(response.body.products[0].name).toBe("Other Shoes")
            expect(response.body.products[3].name).toBe("Shoes")
        })

        test("get product returns 200 with query", async () => {
            const response = await api.get('/api/product').query({name: "Sneakers"})

            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.products).toHaveLength(2)
            expect(response.body.products[1].name).toBe("Sneakers")
            expect(response.body.products[1].price).toBe(300)
            expect(response.body.products[1].description).toBe("Some sneakers")
            expect(response.body.products[1].quantity).toBe(20)
                                      
        })

        test("get product returns 200 with no-match query", async () => {
            const response = await api.get('/api/product').query({name: "klasoashfo23h4"})

            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.products).toHaveLength(0)                                      
        })
    })

    describe("Test update product", () => {
        
    })

    describe("Test delete product", () => {
        
    })

})