import React, { useState, useContext } from "react";
import "../../Styles/cart_item.css";
import { Paper , Grid , Typography , Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
const CartItem = ()=>{

    const [count, setCount] = useState(1)
    
    const IncNum = () => {
        setCount(count + 1);
      };
      const DecNum = () => {
        if (count > 1) setCount(count - 1);
        else {
          setCount(1);
        }
      };
    return(
      // static data used 
      //TODO replace with actual data
      <Paper elevation={5} style={{ width:"700px", margin:"40px"}}>
        <section className = "cart-container">
           <section className = "cart-img">
              <img src= "/logo.png" width="200px"/>
            </section>
            <section className = "cart-details"> 
             <p>Nike Jordans</p>   
             <p>AU$ 100</p>   
            </section>
            <section className="cart-item-quantity">
                <p>quantity : {count}</p>
               <section className="counter" >
                   <Button size="small" style={{backgroundColor:"white", color: 'black',margin:'auto 10px' }} variant="contained" onClick={IncNum} ><AddIcon /></Button>
                   <Button size="small" style={{backgroundColor:"white", color: 'black', margin:'auto 10px'}}  variant="contained" onClick={DecNum}><RemoveIcon /></Button>
                </section>
            </section>
            <section className = "cart-actions">
               <Button startIcon={<DeleteIcon />} variant="contained" style={{backgroundColor:'white' , margin:"20px 10px",color: "black"}}>delete</Button>
               <Button variant="contained" style={{backgroundColor:'white' , margin:"20px 10px",color: "black"}}> view item </Button>
            </section>     
        </section>    
    </Paper>
        
    )
}

export default CartItem;