const supertest = require('supertest')
const app = require('../src/app')

const api = supertest(app)

const getUserToken = async () => {
    const data = {
        username: "testproduct",
        password: "123"
    }
    const response = await api.post("/auth/login").send(data)
    return response.body.token
}

describe("Testing cart API endpoints", () => {

    describe("Test add cart", () => {

        test("add item to cart", async () => {
        
            const token = await getUserToken()
            let productid = ""

           await api.get('/api/product')
                    .expect(response => {
                        expect(response.body.products[4].name).toBe("Other Shoes")
                        expect(response.body.products[4].id).not.toBeNull()
                        productid = response.body.products[4].id
                        console.log(response.body.products)
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .set('Cookie', `token=${token}`)
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
                        expect(response.body.products[4].name).toBe("Other Shoes")
                        expect(response.body.products[4].id).not.toBeNull()
                        productid = response.body.products[4].id
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .set('Cookie', `token=${token}`)
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
                        expect(response.body.products[4].name).toBe("Other Shoes")
                        expect(response.body.products[4].id).not.toBeNull()
                        productid = response.body.products[4].id + "bad product id"
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .set('Cookie', `token=${token}`)
                                .send(data)

            expect(response.status).toBe(400)
        })

        test("add item to cart with bad token", async () => {

            const token = await getUserToken() + "bad token"
            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[4].name).toBe("Other Shoes")
                        expect(response.body.products[4].id).not.toBeNull()
                        productid = response.body.products[4].id
                    })
            
            const data = {
                quantity: 200
            }
            
            const response = await api.put(`/api/cart/add/${productid}`)
                                .set('Cookie', `token=${token}`)
                                .send(data)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
        })

        test("add item to cart with no token", async () => {

            let productid = ""

           await api.get('/api/product')
                    .expect(200)
                    .expect(response => {
                        expect(response.body.products[4].name).toBe("Other Shoes")
                        expect(response.body.products[4].id).not.toBeNull()
                        productid = response.body.products[4].id
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
                        expect(response.body.products[4].name).toBe("Other Shoes")
                        expect(response.body.products[4].id).not.toBeNull()
                        productid = response.body.products[4].id
                    })
            
            const response = await api.delete(`/api/cart/delete/${productid}`).set('Cookie', `token=${token}`)

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
            
            const response = await api.delete(`/api/cart/delete/${productid}`).set('Cookie', `token=${token}`)

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
            
            const response = await api.delete(`/api/cart/delete/${productid}`).set('Cookie', `token=${token}`)

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
            
            const response = await api.delete(`/api/cart/delete/${productid}`).set('Cookie', `token=${token}`)

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