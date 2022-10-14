import React, { useState } from "react";
import axios from "axios";
import { Paper, Button, TextField, Grid, Input} from "@mui/material";
 

const Sell = ()=>{

    const [prodTitle , setTitle] = useState("")
    const [prodDescription , setDescription] = useState("")
    const [prodPrice , setPrice] = useState("")
    const [prodQuantity , setQuantity] = useState("")
    const [productImg, setProductImg] = useState()


    const margin={margin:'30px auto'}

    const handleOnChange = (event, handler) => {
        console.log(event.target.value)
        handler(event.target.value)
    }

    const addProductImage = (event)=>{
        const file = event.target.files[0]
        if(file.type === "image/jpeg" || file.type === "image/jpg") {
            setProductImg(file)
        }
    }

    const handleSellProduct = ()=>{
        console.log("sell")

        const product = {
            name: prodTitle,
            price: prodPrice,
            description: prodDescription,
            quantity: prodQuantity,
            picture: productImg,
        }

        axios.post(`/api/product/register`,  product)
        .then(response=>{
           console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
   <Grid>
        <h1> Enter the following details to list the Sneaker</h1>
        <TextField label='Product-Title' placeholder='Product Title' fullWidth required style={margin} 
        input value={prodTitle} onChange={(event) => handleOnChange(event, setTitle)}></TextField> 
 
        <TextField label='Product-Description' placeholder='Product Description' fullWidth required style={margin} 
        input value={prodDescription} onChange={(event) => handleOnChange(event, setDescription)}></TextField> 
 
        <TextField label='Product-Price' placeholder='Product Price' fullWidth required style={margin} 
        input value={prodPrice} onChange={(event) => handleOnChange(event, setPrice)}></TextField> 

        <TextField label='Product-Quantity' placeholder='Product Quantity' fullWidth required style={margin} 
        input value={prodQuantity} onChange={(event) => handleOnChange(event, setQuantity)}></TextField>

      <p>Add Product Image</p>
      <Input type="file" onChange={addProductImage} alt="image"/>

       <Grid>
          <Button onClick = {handleSellProduct} variant="contained" style={{ margin: "20px", backgroundColor:"white" , color:"black"}}>Sell This Item</Button>
       </Grid>
       

       
   </Grid>

    )
}

export default Sell;