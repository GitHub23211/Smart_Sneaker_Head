import React,{useContext, useEffect, useState} from "react";
import CartItem from "../UserComponents/CartItem";
import axios from "axios";
import{ Paper,Box,Divider,Button, Grid} from "@mui/material";
import {Link} from 'react-router-dom';
import LoginContext from '../../LoginContext';
           

const Cart = ()=>{
    console.log('Rendering Cart');
    const [cartList,setCartList] = useState([]);
    const [newCartList,setNewCartList] = useState([])
    const [refreshCart,setRefreshCart] = useState(false)

    const updateCart = () => {
        console.log('referesh cart called');
        if(refreshCart) {
            setRefreshCart(false);
        } else {
            setRefreshCart(true);
        }
    }

    useEffect(()=>{
        axios.get(`/auth/user`)
        .then(response =>{
            console.log(response.data.cart)
            setCartList(response.data.cart)
        }).catch(error => {
            console.log(error)
        }) 
    }, [refreshCart]);
      
    useEffect(()=>{
        let item_list= [];
        axios.get('/api/product')
        .then(response=>{
          // console.log(response)
          const size = response.data.products.length;
         
          for(let i = 0 ; i <cartList.length ;i++){
            const cart_prod_id = cartList[i].productid;
            for(let j=0; j<size; j++) {
                let product = {
                    ...response.data.products[j],
                };
                if(cart_prod_id === product.id){
                    product.quantity = cartList[i].quantity;
                    item_list.push(product);
                }
            }}
            setNewCartList(item_list)
        }).catch(error=>{
          console.log(error)
        })
    }, [cartList]);

    return(
        <>
        <h1>Shopping Cart</h1>
        <Box sx={{ display: 'inline-flex' }}>
            <Box >
            { newCartList.map(p => 
                (  < CartItem data={{...p, "refereshCartHook": updateCart}}/>   )
                 )
            }
            </Box>    
            <Box>
                <Paper elevation={1} style={{width:"400px" , height:"400px"}}>
                    <Divider>Checkout</Divider>
                     Total number of Items:
                </Paper>
            </Box>
        </Box>


        <Grid align='center'>
        <Link to = "/user/checkout">
            <Button type='submit' color='primary' variant="contained">
                Checkout
            </Button>
         </Link>
        </Grid>

        </>
    )
}

export default Cart;