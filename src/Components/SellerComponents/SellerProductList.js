import React, {useContext, useState } from "react";
import "../../Styles/list_item.css"
import { Paper , Grid , Typography , Button } from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions}  from "@mui/material";
import ProductContext from '../../ProductContext';
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const SellerProductList = ({id , name , price , description , quantity , seller, pictures, deleteItem}) =>{

    const {setProduct} = useContext(ProductContext);
    const [productNavgn, setProductNavgn] = useState(false);  

    const [open,setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent , setMessageContent] = useState("") 

    const handleView = () => {
        setProduct({
            id:id,
            name: name,
            price: price,
            description: description, 
            quantity:quantity,
            pictures: pictures,
            seller: seller
        });
        setProductNavgn(true);
    }

    const handleDelete = () => {
        setMessageTitle(`Delete Product: ${name}`)
        setMessageContent(`Are you sure you want to delete the product: ${name}`)
        setOpen(true)
    }

    if(productNavgn === true){
        return(
            <Navigate to = "/product"></Navigate>
        )
    }else{
        return(
            <Grid item sm={6} className="all-products-individual" align="center">
                <Paper elevation={5} style={{margin:'5px' ,height:'370px',overflow:"auto"}}>
                    <img className="product-list-img" src={`/product/image/${pictures.mainView}`} alt='' ></img>
                    <Typography variant="h5">{name}</Typography>
                    <Typography>AU${price}</Typography>
                    <Button sx={{mt:5}} onClick = {handleView}>View Item</Button>
                    <Link to = {`/seller/editproduct/${id}`} style={{color:"black" , textDecoration: 'none'}}><Button sx={{mt:5}}>Edit Item</Button></Link>
                    <Button sx={{mt:5}} onClick = {handleDelete}>Delete Item</Button>
                </Paper>

                <Dialog open={open}>
                    <DialogTitle>{msgTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{msgContent}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setOpen(false)}>No</Button>
                        <Button onClick={()=>{setOpen(false); deleteItem(id)}}>Yes</Button>
                    </DialogActions>
                </Dialog>    
            </Grid>
        )
    }
}

export default SellerProductList;