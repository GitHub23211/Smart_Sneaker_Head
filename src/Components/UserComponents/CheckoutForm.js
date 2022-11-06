import { useEffect, useState } from "react"
import axios from "axios"

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Paper, Grid, Button } from "@mui/material"

const CheckoutForm = ({}) => {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )
        if(!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret)
              .then( ({paymentIntent}) => {
                    switch(paymentIntent.status) {
                        case "succeeded":
                            setMessage("Payment succeeded!")
                            break
                        case "processing":
                            setMessage("Your payment is processing.")
                            break
                        case "requires_payment_method":
                            setMessage("Your payment was not successful, please try again.")
                            break
                        default:
                            setMessage("Something went wrong.")
                            break
                    }
              })

    }, [stripe])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!stripe || !elements) {
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/user/orderconfirm/"
            }
        })

        if(error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } 
            else {
                setMessage("An unexpected error occurred.");
            }
        }

        setIsLoading(false)
    }

    return (

        <>
            <form id="payment-form" onSubmit={handleSubmit}>
            <Paper style={{marginLeft: "12.5%", padding: "5%", maxWidth: "75%"}}>
                <PaymentElement id="payment-element" />

                <div>
                    <Button type="submit" color='primary' variant="contained" style={{margin: "2%"}}
                    fullwidth disabled={isLoading || !stripe || !elements} id="submit">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </Button>
                </div>
            </Paper>

            {message && <div id="payment-message">{message}</div>}
            </form>
        </>

      )

  
}

export default CheckoutForm