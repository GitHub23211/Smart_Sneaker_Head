import React,{useEffect, useState} from "react";
import axios from "axios";
import {Typography, Grid} from "@mui/material";
import SellerProductList from "./SellerProductList";

const SellerProducts =()=>{
   const [sellList,setSellList] = useState([]);
   const [sellID,setSellID] = useState("")

   axios.get('/auth/seller')
   .then(response => {
      console.log(response.data)
      setSellID(response.data.id)
   }).catch(error => {
      console.log(error)
   })

   useEffect( ()=>{
     axios.get('/api/product' )
     .then(response =>{
      console.log(response.data.products)
      const temp = []
      for(var i = 0; i < response.data.products.length; i++){
         if(response.data.products[i].seller === sellID){
            temp.push(response.data.products[i])
         }
      }
      console.log(temp)
      setSellList(temp)

     }).catch(error =>{
      console.log(error)
     })
    },[sellID]) 

   return(
    <section>
    <h1>My Products</h1>
    <h4>Current Items Listed for Sale</h4>
    <Typography>Need to Add a Check for Seller ID</Typography>

    <section className="my-products">
          <Grid container direction = "row" alignItems="center">
          {sellList.map(p => (
               <SellerProductList key={p.id}
                  id={p.id}
                  name={p.name} 
                  price={p.price} 
                  description={p.description} 
                  quantity={p.quantity}
                  seller={p.seller}
                  pictures={p.pictures}/>
              ))
          }
          </Grid>
          </section>  
    </section>
   )

}

export default SellerProducts;