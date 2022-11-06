import {useState, useEffect} from "react"
import {Link} from 'react-router-dom';
import axios from "axios"

import { Paper, Grid, Button } from "@mui/material"

import CheckoutItem from "./CheckoutItem"

const OrderConfirmation = ({cart}) => {

    return (
        <>
            <Grid>
                <p>Order Details</p>
                {cart.map(item => <CheckoutItem product={item}/>)}
            </Grid>
        </>
    )

}

export default OrderConfirmation