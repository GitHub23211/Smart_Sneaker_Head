import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "../../Styles/cart_item.css";
import { Paper, Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductContext from '../../ProductContext';

const CartItem = ({data:{productid,name,price,quantity,pictures, refereshCartHook}})=>{
    const {setProduct} = useContext(ProductContext);
    const [count, setCount] = useState(quantity);

    const IncNum = () => {
      setCount( count + 1);
    };

    const DecNum = () => {
        if (count > 1) {
          setCount(count - 1);
        } else {
          setCount(1);
        }
    };

    const handleView = () => {
      setProduct({
          id:productid,
          name: name,
          price: price,
          quantity:quantity,
          pictures: pictures,
      });
    };

    const handleDeleteItem = () =>{
      axios.delete(`/api/cart/delete/${productid}`)
      .then(response=>{
        refereshCartHook();
      }).catch(error=>{
        console.log(error)
      });
    };
 
    const handleUpdateItem = (prodObj) => {   
      axios.put(`/api/cart/update/${productid}`,prodObj)
      .then(response=>{
        refereshCartHook();
      }).catch(error=>{
        console.log(error)
      });
    }

    useEffect( () => {
      const prodObj = {
        productid : productid,
        quantity : count
      };
      handleUpdateItem(prodObj);
      }, [count]
    );

    return(
      <Paper elevation={2} style={{ width:"1100px", margin:"10px"}}>
        <section className = "cart-container">
           <section className = "cart-img">
           <img className="cart-list-img" src={`/product/image/${pictures.mainView}`} alt='' width="400px" height="300px"></img>
            </section>
            <section className = "cart-details"> 
             <p>{name}</p>   
             <p>AU$ {price}</p>   
            </section>
            <section className="cart-item-quantity">
                <p>Quantity : {count}</p>
               <section className="counter" >
                   <Button size="small" style={{backgroundColor:"white", color: 'black', margin:'auto 5px', borderRadius:45}}  variant="contained" onClick={DecNum}><RemoveIcon /></Button>
                   <Button size="small" style={{backgroundColor:"white", color: 'black',margin:'auto 5px' , borderRadius:45 }} variant="contained" onClick={IncNum} ><AddIcon /></Button>
                </section>
            </section>
            <section className = "cart-actions">
               <IconButton onClick = {handleDeleteItem}  variant="contained" style={{backgroundColor:'white' , fontSize:1,margin:"20px 10px",color: "black"}}><DeleteIcon/></IconButton>
              <Link to = "/product" fontSize="5px" style={{color:"black" , textDecoration: 'none'}} > <Button onClick = {handleView} variant="contained" style={{backgroundColor:'white' , margin:"20px 10px",color: "black"}}>View</Button></Link>
            </section>     
        </section>    
   </Paper>
        
    )
}

export default CartItem;