const supertest = require('supertest')
const app = require('../src/app')

const api = supertest(app)

describe("Testing product API endpoints", () => {

    describe("Test create product", () => {

        test("create a product", async () => {
            let token = ""
            let sellerid = ""
            const data = {
                username: "testcompany",
                password: "123"
            }

            await api.post("/auth/login")
            .send(data)
            .expect(200)
            .expect(response => {
                expect(response.body.status).toBe("success")
                expect(response.body.token).not.toBeNull()
                expect(response.body.token).not.toBeUndefined()
                token = response.body.token
            })

            await api.get('/auth/seller').set('Authorization', `Bearer ${token}`)
                     .expect(200)
                     .expect(response => {
                        expect(response.body.status).toBe("success")
                        expect(response.body.id).not.toBeNull()
                        expect(response.body.id).not.toBeUndefined()
                        sellerid = response.body.id
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
            let token = ""
            const data = {
                username: "testcompany",
                password: "123"
            }

            await api.post("/auth/login")
            .send(data)
            .expect(200)
            .expect(response => {
                expect(response.body.status).toBe("success")
                expect(response.body.token).not.toBeNull()
                expect(response.body.token).not.toBeUndefined()
                token = response.body.token + "bad token data"
            })

            const product = {
                name: "test1",
                price: "250",
                description: "test product for database",
                quantity: 100
            }

            const response = await api.post('/api/product/register')
                                      .set('Authorization', `Bearer ${token}`)
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
                username: "test",
                password: "123"
            }

            await api.post("/auth/login")
            .send(data)
            .expect(200)
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

            let token = ""
            const data = {
                username: "testcompany",
                password: "123"
            }

            await api.post("/auth/login")
            .send(data)
            .expect(200)
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
            expect(response.body.error).toBe("product already exists")
            expect(response.body.product).toBeUndefined()
        })
    })

    describe("Test get product", () => {
        test("get product returns 200 even without query", async () => {
            const response = await api.get('/api/product')
            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.products).not.toBeUndefined()
        })

        test("get product returns 200 even with query", async () => {
            await api.get('/api/product')
                    .expect(200)
        })
    })

    describe("Test update product", () => {
        
    })

    describe("Test delete product", () => {
        
    })

})


