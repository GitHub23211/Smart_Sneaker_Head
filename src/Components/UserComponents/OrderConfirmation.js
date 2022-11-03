import {useState, useEffect} from "react"
import {Link} from 'react-router-dom';
import axios from "axios"

import { Paper, Grid, Button } from "@mui/material"

import ConfirmItem from "./ConfirmItem"

const OrderConfirmation = () => {

    const [cart, setCart] = useState([]);

    const clearCart = () => {
        axios.delete("/api/cart/clear")
    }

    useEffect(() => {
        axios.get("/auth/user")
             .then(response => setCart(response.data.cart))
    }, [])

    return (
        <>
        <Paper style={{maxWidth: "50%", marginLeft: "25%", marginTop: "5%"}}>
            <Grid >
                <h1>Order Placed!</h1>
                <p>Order Details</p>
                {cart.map(item => <ConfirmItem product={item}/>)}
            </Grid>


        </Paper>
        
        <Grid align='center' style={{marginTop: "1%"}}>
            <Link to = "/productlist" style={{textDecoration: "none"}}>
                <Button onClick={clearCart} type='submit' 
                fullWidth required disableElevation>Confirm</Button>
            </Link>
        </Grid>
        </>
    )

}

export default OrderConfirmation