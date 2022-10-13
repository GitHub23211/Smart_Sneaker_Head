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
    let userToken = ""
    let sellerToken = ""

    describe("Test registration API", () => {
        describe("Test user registration", () => {

            const route = "/auth/register/user"

            test("register user", async () => {
                const data = {
                    username: "test",
                    password: "123",
                    email: "test@test"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(201)
                expect(response.body.status).toBe('success')
                expect(response.body.token).not.toBeNull()
                userToken = response.body.token
            })

            test("register user with taken username", async () => {
                const data = {
                    username: "test",
                    password: "123",
                    email: "test@test1"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('username already taken')
                expect(response.body.token).toBeUndefined()
            })

            test("register user with taken email", async () => {
                const data = {
                    username: "test1",
                    password: "123",
                    email: "test@test"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('email already taken')
                expect(response.body.token).toBeUndefined()
            })

            test("missing required info", async () => {
                const data = {
                    password: "123",
                    email: "test@test"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.token).toBeUndefined()
            })
        })

        describe("Test seller registration", () => {

            const route = "/auth/register/seller"

            test("register seller", async () => {
                const data = {
                    username: "testcompany",
                    password: "123",
                    email: "company@test",
                    companyName: "Sneaker Company"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(201)
                expect(response.body.status).toBe('success')
                expect(response.body.token).not.toBeNull()
                sellerToken = response.body.token
            })

            test("register seller with taken username", async () => {
                const data = {
                    username: "testcompany",
                    password: "123",
                    email: "company@test1",
                    companyName: "Sneaker Company 2"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('username already taken')
                expect(response.body.token).toBeUndefined()
            })

            test("register seller with taken email", async () => {
                const data = {
                    username: "testcompany1",
                    password: "123",
                    email: "company@test",
                    companyName: "Sneaker Company 2"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('email already taken')
                expect(response.body.token).toBeUndefined()
            })

            test("register seller with taken company name", async () => {
                const data = {
                    username: "testcompany1",
                    password: "123",
                    email: "company@test1",
                    companyName: "Sneaker Company"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('company name already taken')
                expect(response.body.token).toBeUndefined()
            })

            test("register seller with email already taken by a user", async () => {
                const data = {
                    username: "testcompany1",
                    password: "123",
                    email: "test@test",
                    companyName: "Sneaker Company3"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('email already taken')
                expect(response.body.token).toBeUndefined()
            })

            test("register seller without required info", async () => {
                const data = {
                    password: "123",
                    email: "company@test1",
                    companyName: "Sneaker Company"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.token).toBeUndefined()
            })
        })
    })

    describe("Test login API", () => {

        const route = "/auth/login"

        describe("Test user login", () => {
            test("Successfully login user", async () => {
                const data = {
                    username: "test",
                    password: "123"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(200)
                expect(response.body.status).toBe("success")
                expect(response.body.token).not.toBeNull()
            })

            test("Wrong password", async () => {
                const data = {
                    username: "test",
                    password: "1234"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe("username or password missing or invalid")
                expect(response.body.token).toBeUndefined()

            })

            test("Wrong username", async () => {
                const data = {
                    username: "testwrongwrongwrong",
                    password: "123"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe("invalid username or password")
                expect(response.body.token).toBeUndefined()

            })

            test("Missing username", async () => {
                const data = {
                    password: "123"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe("username or password missing or invalid")
                expect(response.body.token).toBeUndefined()

            })

            test("Missing password", async () => {
                const data = {
                    username: "test"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe("username or password missing or invalid")
                expect(response.body.token).toBeUndefined()

            })
        })

        describe("test seller login", () => {
            test("Successfully login seller", async () => {
                const data = {
                    username: "testcompany",
                    password: "123"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(200)
                expect(response.body.status).toBe("success")
                expect(response.body.token).not.toBeNull()
            })

            test("Wrong password", async () => {
                const data = {
                    username: "testcompany",
                    password: "1234"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe("username or password missing or invalid")
                expect(response.body.token).toBeUndefined()

            })

            test("Wrong username", async () => {
                const data = {
                    username: "testcompanywrongwrong",
                    password: "123"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe("invalid username or password")
                expect(response.body.token).toBeUndefined()

            })

            test("Missing username", async () => {
                const data = {
                    password: "123"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe("username or password missing or invalid")
                expect(response.body.token).toBeUndefined()

            })

            test("Missing password", async () => {
                const data = {
                    username: "testcompany"
                }
                const response = await api.post(route).send(data)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe("username or password missing or invalid")
                expect(response.body.token).toBeUndefined()

            })
        })
    })

    describe("Test get user/seller API", () => {
        describe("Test get user", () => {

            const route = "/auth/user"

            test("get user information", async () => {
                const response = await api.get(route).set("Authorization", 'Bearer ' + userToken)

                expect(response.status).toBe(200)
                expect(response.body.status).toBe("success")
                expect(response.body.username).toBe("test")
                expect(response.body.email).toBe("test@test")
                expect(response.body.password).toBeUndefined()
            })

            test("get user information with no token", async () => {
                const response = await api.get(route)

                expect(response.status).toBe(401)
                expect(response.body.error).toBe("invalid user")
            })

            test("get user information with bad token", async () => {
                const response = await api.get(route).set("Authorization", 'Bearer ' + userToken + '123')

                expect(response.status).toBe(401)
                expect(response.body.error).toBe("invalid user")
            })

            test("get user information with seller token", async () => {
                const response = await api.get(route).set("Authorization", 'Bearer ' + sellerToken)

                expect(response.status).toBe(400)
                expect(response.body.error).toBe("unregistered or accessing user info with seller account")
            })
        })

        describe("Test get seller", () => {

            const route = "/auth/seller"

            test("get seller information", async () => {
                const response = await api.get(route).set("Authorization", 'Bearer ' + sellerToken)

                expect(response.status).toBe(200)
                expect(response.body.status).toBe("success")
                expect(response.body.username).toBe("testcompany")
                expect(response.body.email).toBe("company@test")
                expect(response.body.companyName).toBe("Sneaker Company")
                expect(response.body.password).toBeUndefined()
            })

            test("get seller information with no token", async () => {
                const response = await api.get(route)

                expect(response.status).toBe(401)
                expect(response.body.error).toBe("invalid user")
            })

            test("get seller information with bad token", async () => {
                const response = await api.get(route).set("Authorization", 'Bearer ' + sellerToken + '123')

                expect(response.status).toBe(401)
                expect(response.body.error).toBe("invalid user")
            })

            test("get seller information with user token", async () => {
                const response = await api.get(route).set("Authorization", 'Bearer ' + userToken)

                expect(response.status).toBe(401)
                expect(response.body.error).toBe("invalid seller")
            })
        })
    })
})

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

    describe("Test update product", () => {
        
    })

    describe("Test delete product", () => {
        
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

})

describe("Testing cart API endpoints", () => {

})

describe("Testing user API endpoints", () => {
    
})

afterAll(async () => {
    await mongoose.connection.close()
})