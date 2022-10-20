import React, { useState, useContext } from "react";
import { Button , Paper} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../Styles/product.css';
import ProductContext from '../ProductContext';
import LoginContext from '../LoginContext';
import axios from "axios"

const Product =()=>{

  const [count, setCount] = useState(0)
  const {product} = useContext(ProductContext);

  const IncNum = () => {
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
    }
  };

  const ProdObj = {
    productid : product.id,
    quantity : count
  }

  const handleAddToCart = ()=>{
    console.log("id",product.id)
    console.log(count)
    axios.put(`/api/cart/add/${product.id}`,ProdObj)
    .then(response =>{
      console.log(response)
    }).catch(error=>{
        console.log(error)
    })
  }

  //axios call to get product details
  // add login first before adding to cart
     return(
      <section className="single-product">
        <Paper elevation={24} style={{ width:"auto",height:"auto" ,backgroundColor:"#f2c988",margin:"100px"}}>

        <section className="product-container">
        <section className="product-img-section">
            <img className="product-img" src={`/product/image/${product.picture}`} alt=''></img>
        </section>

        <section className="product-details-section">
            <h2 className="product-title">{product.name}</h2>
          <p className="product-descripti}on">Description : {product.description} </p>
          <p className="product-price"> price : AU${product.price}</p>
          
          <section className="counter" >
          <Button style={{backgroundColor:"white", color: 'black',margin:'auto 10px' }} variant="contained" onClick={IncNum} ><AddIcon /></Button>
              <h2>{count}</h2>
              <Button style={{backgroundColor:"white", color: 'black', margin:'auto 10px'}}  variant="contained" onClick={DecNum}><RemoveIcon /></Button>
          </section>
          <section>
          <Button onClick={handleAddToCart} variant="contained" style={{backgroundColor:"white",color:"black"}}>Add to Cart</Button>
          </section>
          

        </section>
        </section>

        </Paper> 
      </section>

    )
}

export default Product;