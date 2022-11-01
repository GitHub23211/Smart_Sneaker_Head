import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "../../Styles/wishlist.css";
import { Paper, Button, IconButton } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import ProductContext from '../../ProductContext';

const WishListItem = ({data:{id,name,price,seller,description,quantity,picture, refereshCartHook}})=>{
    const {setProduct} = useContext(ProductContext);
    const [count, setCount] = useState(quantity);

    const[open,setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent , setMessageContent] = useState("") 
  

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
      axios.delete(`/api/wishlist/delete/${id}`)
      .then(response=>{
        refereshCartHook();
      }).catch(error=>{
        console.log(error)
      });
    };
 
    const handleUpdateItem = (prodObj) => {   
      axios.put(`/api/wishlist/update/${id}`,prodObj)
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

    const ProdObj = {
        productid : id,
        quantity : 1
      }
    
      const handleAddToCart = ()=>{
        axios.put(`/api/cart/add/${id}`,ProdObj)
        .then(response =>{
          console.log(response)
        }).catch(error=>{
            console.log(error)
            console.log(error.response.data.error)
            setMessageTitle("Error")
            setMessageContent(error.response.data.error)
            setOpen(true)
        })
      }

    return(
    
        <section className = "wishlist-container">
           <section className = "wishlist-img">
           <img className="wishlist-list-img" src={`/product/image/${picture}`} alt='' width="400px" height="300px"></img>
            </section>
            <section className = "wishlist-details"> 
             <p>{name}</p>   
             <p>AU$ {price}</p>   
            </section>
            <section className = "wishlist-actions">
               <IconButton onClick = {handleDeleteItem}  variant="contained" style={{backgroundColor:'white' , fontSize:1,color: "black"}}><DeleteIcon/></IconButton>
               <Button size="small" onClick = {handleAddToCart} variant="contained" style={{ width:120, backgroundColor:"black",color:"white", margin:"45px 10px",borderRadius: 25,maxHeight: '30px'}} >Add To Cart</Button>  
              <Link to = "/product" fontSize="5px" style={{color:"black" , textDecoration: 'none'}} > <Button onClick = {handleView} variant="contained" style={{ width:50, backgroundColor:"white",color:"black", margin:"45px 10px",borderRadius: 25,maxHeight: '30px'}} >View</Button></Link>
            </section>   
            <Dialog open={open}>
                    <DialogTitle>{msgTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{msgContent}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setOpen(false)}>Okay</Button>
                    </DialogActions>
          </Dialog>
        </section>    

        
    )
}

export default WishListItem;