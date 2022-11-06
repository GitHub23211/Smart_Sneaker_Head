import {useState, useEffect} from "react"
import axios from "axios"

import { Paper, Grid, Box } from "@mui/material"

const CheckoutItem = ({product}) => {
    
    return (
        <>
        <Paper style={{padding: "2%"}}>
            <span>
                <Box sx={{display: "grid", gridTemplateColumns: "8fr 1fr 1fr 1fr"}}>
                    <Grid item>{product.name}</Grid>
                    <Grid item>{product.quantity}</Grid>
                    <Grid item>${product.price}</Grid>
                    <Grid item>${product.price * product.quantity}</Grid>
                </Box>
            </span>
        </Paper>
        </>
    )
}

export default CheckoutItem