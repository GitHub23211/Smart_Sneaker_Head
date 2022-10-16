const supertest = require('supertest')
const mongoose = require('mongoose')
const models = require('../src/models')
const config = require('../src/config')
const app = require('../src/app')

const api = supertest(app)

jest.setTimeout(30000)

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

const getUserToken = async () => {
    let token = ""

    const data = {
        username: "testproduct",
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

    return token
}

const getSeller1Token = async () => {
    const data = {
        username: "testproductcompany",
        password: "123"
    }
    const response = await api.post("/auth/login").send(data)
    return response.body.token
}

beforeAll(async () => {
    try{
        const seller1 = {
            username: "testproductcompany",
            password: "123",
            email: "company@product",
            companyName: "Company Product Test",
            abn: "44000019796"
        }

        await registerSeller(seller1)
        await registerUser()
        const token1 = await getSeller1Token()

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
        products.forEach(async product => await api.post('/api/product/register').set('Authorization', `Bearer ${token1}`).send(product))
    }
    catch (e) {console.log("error occurred setting up products for tests in product.test.js", e.toString())}    
})

describe("Testing cart API endpoints", () => {

    describe("Test add cart", () => {

        test("add item to cart", async () => {

            const token = await getUserToken()
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[2].name).toBe("Sneakers")
                        expect(response.body.products[2].id).not.toBeNull()
                        productid = response.body.products[2].id
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .set('Authorization', `Bearer ${token}`)
                                .send(data)

            expect(response.status).toBe(200)
            expect(response.body.cart[0].productid).toBe(productid)
            expect(response.body.cart[0].quantity).toBe(200)
        })

        test("add item to cart that is already in cart", async () => {

            const token = await getUserToken()
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[2].name).toBe("Sneakers")
                        expect(response.body.products[2].id).not.toBeNull()
                        productid = response.body.products[2].id
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .set('Authorization', `Bearer ${token}`)
                                .send(data)

            expect(response.status).toBe(400)
            expect(response.body.error).toBe("item already in cart")
        })

        test("add item to cart with bad productid", async () => {

            const token = await getUserToken()
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[2].name).toBe("Sneakers")
                        expect(response.body.products[2].id).not.toBeNull()
                        productid = response.body.products[2].id + "bad product id"
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .set('Authorization', `Bearer ${token}`)
                                .send(data)

            expect(response.status).toBe(400)
        })

        test("add item to cart with bad token", async () => {

            const token = await getUserToken() + "bad token"
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[2].name).toBe("Sneakers")
                        expect(response.body.products[2].id).not.toBeNull()
                        productid = response.body.products[2].id
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .set('Authorization', `Bearer ${token}`)
                                .send(data)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
        })

        test("add item to cart with no token", async () => {

            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[2].name).toBe("Sneakers")
                        expect(response.body.products[2].id).not.toBeNull()
                        productid = response.body.products[2].id
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .send(data)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
        })
    })

    describe("Test delete cart", () => {

        test("delete item from cart", async () => {
            const token = await getUserToken()
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[2].name).toBe("Sneakers")
                        expect(response.body.products[2].id).not.toBeNull()
                        productid = response.body.products[2].id
                    })
            
            const response = await api.delete(`/api/cart/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.cart).toHaveLength(0)
        })

        test("delete item in cart that's not in cart", async () => {
            const token = await getUserToken()
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[1].name).toBe("Shoes")
                        expect(response.body.products[1].id).not.toBeNull()
                        productid = response.body.products[1].id
                    })
            
            const response = await api.delete(`/api/cart/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("Error: product not in cart or invalid productid")
        })

        test("delete item in cart but wrong productid", async () => {
            const token = await getUserToken()
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[1].name).toBe("Shoes")
                        expect(response.body.products[1].id).not.toBeNull()
                        productid = response.body.products[1].id + "wrong prductid"
                    })
            
            const response = await api.delete(`/api/cart/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("Error: product not in cart or invalid productid")
        })
  
        test("delete item from cart with bad token", async () => {
            const token = await getUserToken() + "bad token"
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[1].name).toBe("Shoes")
                        expect(response.body.products[1].id).not.toBeNull()
                        productid = response.body.products[1].id
                    })
            
            const response = await api.delete(`/api/cart/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
        })

        test("delete item from cart with no token", async () => {
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[1].name).toBe("Shoes")
                        expect(response.body.products[1].id).not.toBeNull()
                        productid = response.body.products[1].id
                    })
            
            const response = await api.delete(`/api/cart/delete/${productid}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
        })
    })
})