import React, { useState, useContext } from "react";
import { Button , Paper} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../Styles/product.css';
import ProductContext from '../ProductContext';

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

  //axios call to get product details
     return(

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
         <Button variant="contained" style={{backgroundColor:"white",color:"black"}}>Add to Cart</Button>
         </section>
        

      </section>
     </section>

     </Paper> 


    )
}

export default Product;