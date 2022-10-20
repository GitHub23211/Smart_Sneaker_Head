import React,{useContext,useState} from "react";
import "../Styles/list_item.css"
import { Paper , Grid , Typography , Button } from "@mui/material";
import ProductContext from '../ProductContext';
import { Navigate } from "react-router-dom";

const ProductListItem = ({id , name , price , description , quantity , seller, picture}) =>{

    const {setProduct} = useContext(ProductContext);
    const [productNavgn, setProductNavgn] = useState(false);

    const handleView = () => {
        console.log("handleview")
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
            <Paper elevation={5} style={{margin:'5px' ,height:'300px'}}>
                    <Grid item className="all-products-individual">
                        <img className="product-list-img" src={`/product/image/${picture}`} alt='' ></img>
                        <Typography variant="h5">{name}</Typography>
                        <Typography>AU${price}</Typography>
                        <Button onClick = {handleView}>View Item</Button>
                        <Button>Add to wishList</Button>
                    </Grid>
                   
                    {/* <Grid item sm={2}>
                        <Typography variant="h5">{name}</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography>AU${price}</Typography>
                         <Button onClick = {handleView}>View Item</Button>
                         <Button>Add to wishList</Button>
                    </Grid> */}
            </Paper>
        )
    }


}

export default ProductListItem;



