import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import { Paper , Grid , Typography , Button } from "@mui/material";


const ProductList =()=>{

   const [productlist , setProductlist] = useState([])

    useEffect( ()=>{
        axios.get('/api/product')
        .then(response => {
            console.log(response)
            setProductlist(response.data.products)
            console.log("list",productlist)
        })
    },[])
  
    return(
        <section className="all-products-page"> 
        <p>fake blank space</p>
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