import React,{useEffect, useState} from "react";
import CartItem from "../UserComponents/CartItem";
import axios from "axios";
import{ Paper,Box,Divider,Button, Grid, TextField} from "@mui/material";
import {Link} from 'react-router-dom';
           
const Cart = ()=>{
    const [cartList,setCartList] = useState([]);
    const [newCartList,setNewCartList] = useState([])
    const [refreshCart,setRefreshCart] = useState(false)
    const [cart_total , setCartTotal] = useState(0)

    const updateCart = () => {
        if(refreshCart) {
            setRefreshCart(false);
        } else {
            setRefreshCart(true);
        }
    }

    useEffect(()=>{
        axios.get(`/auth/user`)
        .then(response =>{
            setCartList(response.data.cart)
        }).catch(error => {
            console.log(error)
        }) 
    }, [refreshCart]);
      
    useEffect(()=>{
        let item_list= [];
        axios.get('/api/product')
        .then(response=>{
          const size = response.data.products.length;
          let total = 0;
          for(let i = 0 ; i <cartList.length ;i++){
            const cart_prod_id = cartList[i].productid;
            
            for(let j=0; j<size; j++) {
                let product = {
                    ...response.data.products[j],
                };
                if(cart_prod_id === product.id){
                    product.quantity = cartList[i].quantity;
                    item_list.push(product);
                    let price = product.price;
                    total = total + (product.quantity * price)
                }
            } 
            
        }
            setCartTotal(total)
            setNewCartList(item_list)
        }).catch(error=>{
          console.log(error)
        })
    }, [cartList]);

    return(
        <>
        <h1>Shopping Cart</h1>
        <Box sx={{ display: 'inline-flex', pr:'100px' }}>
            <Box sx={{border:"black", pr:'100px'}} >
            { newCartList.map(p => 
                (  
                   <>
                    < CartItem data={{...p, "refereshCartHook": updateCart}}/> 
                    <Divider sx={{ font: "10px" }} />
                   </>
                  )
                 )
            }
            <Link to = "/productlist" style={{color:"black" , textDecoration: 'none'}} >
               <Button variant="contained" style={{backgroundColor:"white", color: 'black', margin:'10px auto'}}>Continue Shopping</Button>
            </Link>
            </Box>    
            <Box>
                <Paper elevation={1} style={{width:"400px" , height:"100%"}}>
                    <Box sx={{pt:"10px"}}>
                     <h3>CHECKOUT SUMMARY</h3>
                        <h5> Total Cost : AU$ {cart_total} </h5>
                    </Box>

                     <Divider>Discount Code</Divider>
                    <Box>

                    <TextField  id="outlined-basic" label="Enter dicount code" variant="outlined"   sx={{margin:"10px 10px"}}/>
                    </Box>

                    <Grid align='center'>
                        <Link to = "/user/checkout" style={{color:"black" , textDecoration: 'none'}} >
                             <Button type='submit' variant="contained" style={{backgroundColor:"white", color: 'black', margin:'10px auto'}}>Checkout</Button>
                        </Link>
                    </Grid>
                </Paper>
            </Box>
        </Box>




        </>
    )
}

export default Cart;