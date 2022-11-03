import React, {useContext, useState } from "react";
import "../../Styles/list_item.css"
import { Paper , Grid , Typography , Button } from "@mui/material";
import ProductContext from '../../ProductContext';
import { Navigate } from "react-router-dom";
import axios from "axios";

const SellerProductList = ({id , name , price , description , quantity , seller, pictures}) =>{

    const {setProduct} = useContext(ProductContext);
    const [productNavgn, setProductNavgn] = useState(false);  

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

    const handleEditProduct = () =>{
        axios.put(`/api/wishlist/add/${id}`)
        .then(response =>{
            console.log(response)
        }).catch(error =>{
            console.log(error)
        })
    }

    if(productNavgn === true){
        return(
            <Navigate to = "/product"></Navigate>
        )
    }else{
        return(
            <Grid item sm={6} className="all-products-individual" align="center">
                <Paper elevation={5} style={{margin:'5px' ,height:'370px',overflow:"scroll"}}>
                    <img className="product-list-img" src={`/product/image/${pictures.mainView}`} alt='' ></img>
                    <Typography variant="h5">{name}</Typography>
                    <Typography>AU${price}</Typography>
                    <Button sx={{mt:5}} onClick = {handleView}>View Item</Button>
                    <Button sx={{mt:5}} onClick = {handleEditProduct}>Edit Item</Button>
                </Paper>
            </Grid>
        )
    }


}

export default SellerProductList;