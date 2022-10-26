import axios from "axios";
import React, { useEffect,useContext, useState } from "react";
import ProductListContext from "../ProductListContext";
import ProductListItem from "./ProductListItem";
import { Grid } from "@mui/material";

const ProductList =()=>{

   const {query_params}  = useContext(ProductListContext);
   const [productlist,setProductList] = useState([])
   
  useEffect( ()=>{
      const params = {
          name: query_params,
      };
    
     axios.get('api/product' , {params})
     .then(response =>{
      console.log(response.data.products)
      setProductList(response.data.products)

     }).catch(error =>{
      console.log(error)
     })
    },[query_params]) 
  
    return(
      <section className="all-products-page"> 
      <br></br>
      <p>Feel free to browse our selection of sneakers and shoes. Make sure to check out our weekly deals!!</p>
      <h1>All Products</h1>
          <section className="all-products">
          <Grid container direction = "row" alignItems="center">
          {productlist.map(p => (
               <ProductListItem 
                  id={p.id}
                  name={p.name} 
                  price={p.price} 
                  description={p.description} 
                  quantity={p.quantity}
                  seller={p.seller}
                  picture={p.picture}/>
              ))
          }
          </Grid>
          </section>  
     </section>
   )
}

export default ProductList;