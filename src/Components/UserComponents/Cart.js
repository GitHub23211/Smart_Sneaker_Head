import React,{useContext} from "react";
import CartItem from "../UserComponents/CartItem";
import axios from "axios";
import{ Paper,Box,Divider} from "@mui/material";
import LoginContext from '../../LoginContext';

const Cart = ()=>{
 
    const {userToken} = useContext(LoginContext);

    const options = {
        headers: {
            'Authorization': `bearer ${userToken}`
        }
    };

    // axios call for items in cart
    axios.get(`/auth`,options)
    .then(response =>{
        console.log(response)
    }).catch(error => {
         console.log(error)
    })

    return(
        <>
        <h1>Shopping Cart</h1>
        <Box sx={{ display: 'inline-flex' }}>
            <Box >
                < CartItem />
            </Box>    
            <Box>
                <Paper elevation={1} style={{width:"400px" , height:"400px"}}>
                    <Divider>Checkout</Divider>
                     Total number of Items:

                </Paper>
            </Box>
        </Box>
        </>
    )
}

export default Cart;