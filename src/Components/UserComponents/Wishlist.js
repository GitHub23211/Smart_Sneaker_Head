import React,{useEffect, useState} from "react";
import WishListItem from "./WishListItem";
import axios from "axios";
import{ Box,Divider} from "@mui/material";
import {Link} from 'react-router-dom';
           
const WishList = ()=>{
    const [wishList,setWishList] = useState([]);
    const [newWishList,setNewWishList] = useState([])
    const [refreshWishList,setRefreshWishList] = useState(false)

    const updateCart = () => {
        if(refreshWishList) {
            setRefreshWishList(false);
        } else {
            setRefreshWishList(true);
        }
    }

    useEffect(()=>{
        axios.get(`/auth/user`)
        .then(response =>{
            setWishList(response.data.wishlist)
        }).catch(error => {
            console.log(error)
        }) 
    }, [refreshWishList]);
      
    useEffect(()=>{
        let item_list= [];
        axios.get('/api/product')
        .then(response=>{
          const size = response.data.products.length;
          for(let i = 0 ; i <wishList.length ;i++){
            const cart_prod_id = wishList[i].productid;
            
            for(let j=0; j<size; j++) {
                let product = {
                    ...response.data.products[j],
                };
                if(cart_prod_id === product.id){
                    product.quantity = wishList[i].quantity;
                    item_list.push(product);
                }
            } 
            
        }
            setNewWishList(item_list)
        }).catch(error=>{
          console.log(error)
        })
    }, [wishList]);

    return(
      <>
        <h1>WISHLIST</h1>
        <Box sx={{ display: 'inline-flex', pr:'100px' }}>
            <Box sx={{border:"black", pr:'100px'}} >
            { newWishList.map(p => 
                (  
                   <>
                    < WishListItem data={{...p, "refereshCartHook": updateCart}} /> 
                    <Divider sx={{ font: "10px" }} />
                   </>
                  )
                 )
            }
            </Box>    
        </Box>
      </>
    )
}

export default WishList;