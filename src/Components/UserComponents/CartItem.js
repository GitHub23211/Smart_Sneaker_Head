import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "../../Styles/cart_item.css";
import { Paper, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductContext from '../../ProductContext';
import LoginContext from '../../LoginContext';

const CartItem = ({data:{id,name,price,seller,description,quantity,picture, refereshCartHook}})=>{
    const {setProduct} = useContext(ProductContext);
    const {userToken} = useContext(LoginContext);
    const [count, setCount] = useState(quantity);

    const options = {
      headers: {
          'Authorization': `bearer ${userToken}`
      }
    };

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
          id:id,
          name: name,
          price: price,
          description: description, 
          quantity:quantity,
          picture: picture,
          seller: seller
      });
    };

    const handleDeleteItem = () =>{
      axios.delete(`/api/cart/delete/${id}`,options)
      .then(response=>{
        refereshCartHook();
      }).catch(error=>{
        console.log(error)
      });
    };
 
    const handleUpdateItem = (prodObj) => {   
      axios.put(`/api/cart/update/${id}`,prodObj,options)
      .then(response=>{
        refereshCartHook();
      }).catch(error=>{
        console.log(error)
      });
    }

    useEffect( () => {
      const prodObj = {
        productid : id,
        quantity : count
      };
      handleUpdateItem(prodObj);
      }, [count]
    );

    return(
      // static data used 
      //TODO replace with actual data
      <Paper elevation={5} style={{ width:"700px", margin:"40px"}}>
        <section className = "cart-container">
           <section className = "cart-img">
           <img className="product-list-img" src={`/product/image/${picture}`} alt='' ></img>
            </section>
            <section className = "cart-details"> 
             <p>{name}</p>   
             <p>AU$ {price}</p>   
            </section>
            <section className="cart-item-quantity">
                <p>quantity : {count}</p>
               <section className="counter" >
                   <Button size="small" style={{backgroundColor:"white", color: 'black',margin:'auto 10px' }} variant="contained" onClick={IncNum} ><AddIcon /></Button>
                   <Button size="small" style={{backgroundColor:"white", color: 'black', margin:'auto 10px'}}  variant="contained" onClick={DecNum}><RemoveIcon /></Button>
                </section>
            </section>
            <section className = "cart-actions">
               <Button onClick = {handleDeleteItem} startIcon={<DeleteIcon />} variant="contained" style={{backgroundColor:'white' , margin:"20px 10px",color: "black"}}>delete</Button>
              <Link to = "/product"  style={{color:"black" , textDecoration: 'none'}} > <Button onClick = {handleView} variant="contained" style={{backgroundColor:'white' , margin:"20px 10px",color: "black"}}> view item </Button></Link>
            </section>     
        </section>    
    </Paper>
        
    )
}

export default CartItem;