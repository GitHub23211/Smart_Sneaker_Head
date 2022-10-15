const supertest = require('supertest')
const app = require('../src/app')

const api = supertest(app)

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
                    companyName: "Sneaker Company",
                    abn: "74172177893"
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
                    companyName: "Sneaker Company 2",
                    abn: "95316916607"
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
                    companyName: "Sneaker Company 2",
                    abn: "95316916607"
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
                    companyName: "Sneaker Company",
                    abn: "95316916607"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('company name already taken')
                expect(response.body.token).toBeUndefined()
            })

            test("register seller with taken abn", async () => {
                const data = {
                    username: "testcompany1",
                    password: "123",
                    email: "company@test1",
                    companyName: "Sneaker Company1",
                    abn: "74172177893"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('abn already taken')
                expect(response.body.token).toBeUndefined()
            })

            test("register seller with email already taken by a user", async () => {
                const data = {
                    username: "testcompany1",
                    password: "123",
                    email: "test@test",
                    companyName: "Sneaker Company3",
                    abn: "95316916607"
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
                    companyName: "Sneaker Company",
                    abn: "95316916607"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.token).toBeUndefined()
            })
            
            test("register seller with invalid ABN", async () => {
                const data = {
                    username: "testcompany4",
                    password: "123",
                    email: "company@test4",
                    companyName: "Sneaker Company 4",
                    abn: "4172177893"
                }
            
                const response = await api.post(route).send(data)
            
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('invalid ABN')
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