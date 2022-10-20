import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import axios from "axios"

//testing credit card number: 4242 4242 4242 4242 use any Expiration and CVC
const stripePromise = loadStripe("pk_test_51Lumw1DHr26cPUdcFOXGWPz4N5ChQBaTTgXvDuUGXwjKVOp6ZO1kiPpnZ4soGbqRMnURIUKEFzdczDBSzjband9Q00jbTI3SGn")

const Payment = ({}) => {
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.post("/api/cart/checkout")
             .then(response => {
                setClientSecret(response.data.clientSecret) 
             })
    }, [])

    const appearance = {
        theme: 'stripe'
    }

    const options = {
        clientSecret,
        appearance
    }
    
    return(
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
      )}
        </div>
    )
}

export default Payment;