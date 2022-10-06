import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";


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
            <> {
                productlist.map(p =>
                ( <ProductListItem 
                    name={p.name} 
                    price={p.price} 
                    description={p.description} 
                    quantity={p.quantity}
                    seller={p.seller}
                    picture={p.picture}/>
                )

            )
         }    
       </>
     )
}

export default ProductList;