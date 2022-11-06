import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import axios from "axios"

import { Box, Grid} from "@mui/material"

import OrderConfirmation from "./OrderConfirmation"

//testing credit card number: 4242 4242 4242 4242 use any Expiration and CVC
const stripePromise = loadStripe("pk_test_51Lumw1DHr26cPUdcFOXGWPz4N5ChQBaTTgXvDuUGXwjKVOp6ZO1kiPpnZ4soGbqRMnURIUKEFzdczDBSzjband9Q00jbTI3SGn")

const Payment = ({}) => {
    const [clientSecret, setClientSecret] = useState("")
    const [cart, setCart] = useState([])    

    useEffect(() => {
        if(cart.length > 0) {
            const payload = {
                total: cart.reduce(function(total, item) {return (item.price * item.quantity) + total}, 0) * 100
            }
            axios.post("/api/cart/checkout", payload)
                 .then(response => {
                    setClientSecret(response.data.clientSecret)
                 })
        }
    }, [cart])

    useEffect(() => {
        axios.get("/auth/user")
             .then(response => setCart(response.data.cart))
    }, [])

    const appearance = {
        theme: 'stripe'
    }

    const options = {
        clientSecret,
        appearance
    }
    
    return(
        <>
            <h1 style={{marginTop: "2%"}}>Enter Payment Details</h1>

            <Box container >

                <Grid item style={{marginLeft: "12.5%", maxWidth: "75%"}}>
                    <OrderConfirmation cart={cart}/>
                </Grid>

                <Grid item>
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </Grid>

            </Box>
        </>

    )
}

export default Payment;