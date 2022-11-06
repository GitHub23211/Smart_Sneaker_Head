import React,{useEffect, useState} from "react";
import CartItem from "../UserComponents/CartItem";
import axios from "axios";
import{ Paper,Box,Divider,Button, Grid, TextField} from "@mui/material";
import {Link} from 'react-router-dom';
           
const Cart = ()=>{
    const [cartList,setCartList] = useState([]);
    const [refreshCart,setRefreshCart] = useState(false)
    const [cart_total , setCartTotal] = useState(0)
    const [discount , setDiscount] = useState(0)
    const [promo , setPromo] = useState("")

    const updateCart = () => {
        if(refreshCart) {
            setRefreshCart(false);
        } else {
            setRefreshCart(true);
        }
    }

    const ApplyPromo = () =>{
        if(promo === "FIRSTORDER"){
            setDiscount(50)
            setPromo("")
        }
        else{
            setDiscount(0)
            setPromo("")
        }
    }

    const handleOnChange = (event, handler) => {
        handler(event.target.value)
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
            setCartTotal(cartList.reduce(function(total, item) {return (item.quantity * item.price) + total}, 0))
        }, [cartList]);

    return(
        <>
        <h1>Shopping Cart</h1>
        <Box sx={{ display: 'inline-flex', pr:'100px' }}>
            <Box sx={{border:"black", pr:'100px'}} >
            { cartList.map(p => 
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
                <Paper elevation={1} style={{width:"400px" , height:"auto"}}>
                    <Box sx={{pt:"10px"}}>
                     <h3>CHECKOUT SUMMARY</h3>
                     <Divider/>
                     <p>SUBTOTAL :  AU$ {cart_total} </p>
                     <p>DISCOUNT :  AU$ {discount} </p>
                     <Box>
                      <TextField size="small" id="outlined-basic" label="Enter dicount code" variant="outlined" sx={{margin:"10px 10px"}} onChange={(event) => handleOnChange(event, setPromo)}></TextField>
                      <Button size="small" variant = "outlined"  sx={{margin:"10px 10px",mt:"15px",color:"black"}} onClick={ApplyPromo}>Apply</Button>
                    </Box>
                     <Divider/>
                     <h5> Total Cost : AU$ {cart_total-discount} </h5>
                    </Box>

                     <Divider/>


                    <Grid align='center'>
                        <Link to = "/user/checkout" style={{color:"black" , textDecoration: 'none'}} >
                             <Button type='submit' size="large" variant="contained" sx={{width:250, backgroundColor:"black", color: 'white' ,mr:"20px",ml:"20px",mb:"10px",borderRadius: 25,maxHeight: '90px'}}>Checkout</Button>
                        </Link>
                    </Grid>
                </Paper>
            </Box>
        </Box>




        </>
    )
}

export default Cart;