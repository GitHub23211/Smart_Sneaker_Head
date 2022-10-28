import React, {useContext, useState } from "react";
import "../Styles/list_item.css"
import { Paper , Grid , Typography , Button } from "@mui/material";
import ProductContext from '../ProductContext';
import { Navigate } from "react-router-dom";

const ProductListItem = ({id , name , price , description , quantity , seller, picture}) =>{

    const {setProduct} = useContext(ProductContext);
    const [productNavgn, setProductNavgn] = useState(false);  

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
        setProductNavgn(true);
    }
    if(productNavgn === true){
        return(
            <Navigate to = "/product"></Navigate>
        )
    }else{
        return(
            <Grid item sm={4} className="all-products-individual" align="center">
                <Paper elevation={5} style={{margin:'5px' ,height:'370px',overflow:"scroll"}}>
                    <img className="product-list-img" src={`/product/image/${picture}`} alt='' ></img>
                    <Typography variant="h5">{name}</Typography>
                    <Typography>AU${price}</Typography>
                    <Button sx={{mt:5}} onClick = {handleView}>View Item</Button>
                    <Button sx={{mt:5}}>Add to wishList</Button>
                </Paper>
            </Grid>
        )
    }


}

export default ProductListItem;



