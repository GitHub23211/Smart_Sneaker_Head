import {useState, useEffect} from "react"
import axios from "axios"

import { Paper, Grid, Box } from "@mui/material"

const CheckoutItem = ({product}) => {

    const imgStyle = {
        maxWidth: "100px",
        maxHeight: "100px"
    }
    
    return (
        <>
        <Paper style={{padding: "2%"}}>
            <span>
                <Box sx={{display: "grid", gridTemplateColumns: "3fr 6fr 1fr 1fr 1fr"}}>
                    <Grid item>{<img src={`/product/image/${product.pictures.mainView}`} alt="" style={imgStyle}/>}</Grid>
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