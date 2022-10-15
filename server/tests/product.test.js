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

const getSeller2Token = async () => {
    const data = {
        username: "testproductcompany2",
        password: "123"
    }
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
            const token = await getSeller1Token()
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
            const token = await getSeller1Token()
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

            const token = await getUserToken()

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
            const token = await getSeller1Token()

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

        test("Update product", async () => {

            const token = await getSeller1Token()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Sneakers"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(2)
                        expect(response.body.products[1].name).toBe("Sneakers")
                        productid = response.body.products[1].id
                     })
            
            const updatedInfo = {
                name: "Sneakers updated",
                price: 999,
                description: "updated",
                quantity: 0
            }
            const response = await api.put(`/api/product/update/${productid}`)
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(updatedInfo)
            
            expect(response.status).toBe(200)

            await api.get('/api/product')
            .query({name: "Sneakers"})
            .expect(response => {
               expect(response.body.products).toHaveLength(2)
               expect(response.body.products[1].name).toBe("Sneakers updated")
               expect(response.body.products[1].price).toBe(999)
               expect(response.body.products[1].description).toBe("updated")
               expect(response.body.products[1].quantity).toBe(0)
            })
        

        })

        test("Update product partially", async () => {

            const token = await getSeller1Token()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Shoes"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(2)
                        expect(response.body.products[1].name).toBe("Shoes")
                        productid = response.body.products[1].id
                     })
            
            const updatedInfo = {
                price: 999,
                description: "updated"
            }
            const response = await api.put(`/api/product/update/${productid}`)
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(updatedInfo)
            
            expect(response.status).toBe(200)

            await api.get('/api/product')
            .query({name: "Shoes"})
            .expect(response => {
               expect(response.body.products).toHaveLength(2)
               expect(response.body.products[1].name).toBe("Shoes")
               expect(response.body.products[1].price).toBe(999)
               expect(response.body.products[1].description).toBe("updated")
               expect(response.body.products[1].quantity).toBe(20)
            })
        

        })
        
        test("Update product with bad token", async () => {

            const token = await getSeller1Token() + "bad token"
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Sneakers updated"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(1)
                        expect(response.body.products[0].name).toBe("Sneakers updated")
                        productid = response.body.products[0].id
                     })
            
            const updatedInfo = {
                name: "Sneakers updated bad token",
                price: 999,
                description: "updated",
                quantity: 0
            }
            const response = await api.put(`/api/product/update/${productid}`)
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(updatedInfo)
            
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")

            await api.get('/api/product')
            .query({name: "Sneakers"})
            .expect(response => {
               expect(response.body.products).toHaveLength(2)
               expect(response.body.products[1].name).toBe("Sneakers updated")
               expect(response.body.products[1].price).toBe(999)
               expect(response.body.products[1].description).toBe("updated")
               expect(response.body.products[1].quantity).toBe(0)
            })
        })

        test("Update product with no token", async () => {

            let productid = ""
            await api.get('/api/product')
                     .query({name: "Sneakers updated"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(1)
                        expect(response.body.products[0].name).toBe("Sneakers updated")
                        productid = response.body.products[0].id
                     })
            
            const updatedInfo = {
                name: "Sneakers updated bad token",
                price: 999,
                description: "updated",
                quantity: 0
            }
            const response = await api.put(`/api/product/update/${productid}`)
                                      .send(updatedInfo)
            
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")

            await api.get('/api/product')
            .query({name: "Sneakers"})
            .expect(response => {
               expect(response.body.products).toHaveLength(2)
               expect(response.body.products[1].name).toBe("Sneakers updated")
               expect(response.body.products[1].price).toBe(999)
               expect(response.body.products[1].description).toBe("updated")
               expect(response.body.products[1].quantity).toBe(0)
            })
        })
        
        test("Update product of other seller", async () => {

            const token = await getSeller1Token()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Other Sneakers"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(1)
                        expect(response.body.products[0].name).toBe("Other Sneakers")
                        productid = response.body.products[0].id
                     })
            
            const updatedInfo = {
                name: "Other Sneakers updated by seller1",
                price: 999,
                description: "updated",
                quantity: 0
            }
            const response = await api.put(`/api/product/update/${productid}`)
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(updatedInfo)
            
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("Error: Not the original seller or product no longer exists")

            await api.get('/api/product')
            .query({name: "Sneakers"})
            .expect(response => {
               expect(response.body.products).toHaveLength(2)
               expect(response.body.products[0].name).toBe("Other Sneakers")
               expect(response.body.products[0].price).toBe(100)
               expect(response.body.products[0].description).toBe("Some other sneakers")
               expect(response.body.products[0].quantity).toBe(5)
            })
        })

        test("User tries to update product", async () => {

            const token = await getUserToken()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Other Sneakers"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(1)
                        expect(response.body.products[0].name).toBe("Other Sneakers")
                        productid = response.body.products[0].id
                     })
            
            const updatedInfo = {
                name: "Other Sneakers updated by user",
                price: 999,
                description: "updated",
                quantity: 0
            }
            const response = await api.put(`/api/product/update/${productid}`)
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(updatedInfo)
            
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid seller")

            await api.get('/api/product')
            .query({name: "Sneakers"})
            .expect(response => {
               expect(response.body.products).toHaveLength(2)
               expect(response.body.products[0].name).toBe("Other Sneakers")
               expect(response.body.products[0].price).toBe(100)
               expect(response.body.products[0].description).toBe("Some other sneakers")
               expect(response.body.products[0].quantity).toBe(5)
            })
        })
    })

    describe("Test delete product", () => {

        test("delete a product", async () => {
            const token = await getSeller1Token()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Sneakers updated"})
                     .expect(response => {
                        expect(response.body.products[0].name).toBe("Sneakers updated")
                        productid = response.body.products[0].id
                     })
            
            const response = await api.delete(`/api/product/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.product.name).toBe("Sneakers updated")
            expect(response.body.product.id).toBe(productid)
        })

        test("try to delete a product from another seller", async () => {
            const token = await getSeller2Token()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Shoes"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(2)
                        expect(response.body.products[1].name).toBe("Shoes")
                        productid = response.body.products[1].id
                     })
            
            const response = await api.delete(`/api/product/delete/${productid}`).set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("Error: Not the original seller or product no longer exists")
            expect(response.body.product).toBeUndefined()
        })

        test("delete with invalid product id", async () => {
            const token = await getSeller1Token()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Shoes"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(2)
                        expect(response.body.products[1].name).toBe("Shoes")
                        productid = response.body.products[1].id + "bad product id"
                     })
            
            const response = await api.delete(`/api/product/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(400)
            expect(response.body.error).toBe("invalid productid")
            expect(response.body.product).toBeUndefined()
        })

        test("delete product that no longer exists", async () => {
            const token = await getSeller1Token()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Shoes"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(2)
                        expect(response.body.products[1].name).toBe("Shoes")
                        productid = response.body.products[1].id
                     })
            
            await api.delete(`/api/product/delete/${productid}`).set('Authorization', `Bearer ${token}`).expect(200)

            const response = await api.delete(`/api/product/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("Error: Not the original seller or product no longer exists")
            expect(response.body.product).toBeUndefined()
        })

        test("user tries to delete product", async () => {
            const token = await getUserToken()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Rapid Force Anti Shoe"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(1)
                        expect(response.body.products[0].name).toBe("Rapid Force Anti Shoe")
                        productid = response.body.products[0].id
                     })

            const response = await api.delete(`/api/product/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid seller")
            expect(response.body.product).toBeUndefined()
        })

        test("delete product with bad token", async () => {
            const token = await getSeller1Token() + "bad token"
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Rapid Force Anti Shoe"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(1)
                        expect(response.body.products[0].name).toBe("Rapid Force Anti Shoe")
                        productid = response.body.products[0].id
                     })

            const response = await api.delete(`/api/product/delete/${productid}`).set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
            expect(response.body.product).toBeUndefined()
        })

        test("delete product with no token", async () => {
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Rapid Force Anti Shoe"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(1)
                        expect(response.body.products[0].name).toBe("Rapid Force Anti Shoe")
                        productid = response.body.products[0].id
                     })

            const response = await api.delete(`/api/product/delete/${productid}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe("invalid user")
            expect(response.body.product).toBeUndefined()
        })


        test("try to update a deleted product", async () => {
            const token = await getSeller1Token()
            let productid = ""
            await api.get('/api/product')
                     .query({name: "Rapid Force Anti Shoe"})
                     .expect(response => {
                        expect(response.body.products).toHaveLength(1)
                        expect(response.body.products[0].name).toBe("Rapid Force Anti Shoe")
                        productid = response.body.products[0].id
                     })

            await api.delete(`/api/product/delete/${productid}`).set('Authorization', `Bearer ${token}`).expect(200)

            const updatedInfo = {
                name: "Rapid Updated",
                price: 9299,
                description: "updated",
                quantity: 10
                
            }
            const response = await api.put(`/api/product/update/${productid}`)
                                      .set('Authorization', `Bearer ${token}`)
                                      .send(updatedInfo)
            
            expect(response.status).toBe(401)
            expect(response.body.error).toBe("Error: Not the original seller or product no longer exists")
        })
        
    })

})