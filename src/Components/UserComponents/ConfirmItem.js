import {useState, useEffect} from "react"
import axios from "axios"

import { Paper, Grid, Box } from "@mui/material"

const ConfirmItem = ({product}) => {

    const [cartItem, setItem] = useState({})

    useEffect(() => {
        axios.get(`/api/product/${product.productid}`)
             .then(response => setItem(response.data.product))
    }, [])

    useEffect(() => {
        console.log("ITEM", cartItem.pictures)
    }, [cartItem])


    return (
        <>
        <Paper style={{padding: "2%"}}>
            <span>
                <Box sx={{display: "grid", gridTemplateColumns: "8fr 1fr 1fr 1fr"}}>
                    <Grid item>{cartItem.name}</Grid>
                    <Grid item>{cartItem.quantity}</Grid>
                    <Grid item>${cartItem.price}</Grid>
                    <Grid item>${cartItem.price * cartItem.quantity}</Grid>
                </Box>
            </span>
        </Paper>
        </>
    )
}

export default ConfirmItem