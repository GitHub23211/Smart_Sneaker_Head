import React, { useState } from "react";
import axios from "axios";
import { Paper, Button, TextField, Grid, Input} from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions}  from "@mui/material";
 

const Sell = ()=>{

    const [prodTitle , setTitle] = useState("")
    const [prodDescription , setDescription] = useState("")
    const [prodPrice , setPrice] = useState("")
    const [prodQuantity , setQuantity] = useState("")
    const [prodBrand , setBrand] = useState("")
    const [productImg, setProductImg] = useState(null)
    const [imgName, setImgName] = useState("")

    const [open,setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent , setMessageContent] = useState("") 

    const openDialog= ()=>{
        setOpen(true);
    }

    const margin={margin:'30px auto'}

    const handleOnChange = (event, handler) => {
        console.log(event.target.value)
        handler(event.target.value)
    }

    const addProductImage = (event)=>{
        const file = event.target.files[0]
        if(file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
            setProductImg(file)
            setImgName(file.filename)
        }
    }

    const handleSellProduct = ()=>{
        if(productImg) {
          const imageData = new FormData()
          imageData.append("product", productImg)
          axios.post("/api/upload/product", imageData)
          .then(response => response.data.filename)
          .then(response => sendInfo(response))
          .catch(error => console.log(error.toString()))
        }
        else {
          sendInfo(null)
        }
    }

    const sendInfo = (image)=>{
        console.log("sell")

        const product = {
            name: prodTitle,
            price: prodPrice,
            description: prodDescription,
            quantity: prodQuantity,
            brand: prodBrand,
            picture: image
        }

        axios.post(`/api/product/register`,  product)
        .then(response=>{
           console.log(response)
           setTitle("")
           setDescription("")
           setPrice("")
           setQuantity("")
           setBrand("")
           setProductImg(null)
           setImgName("")
           setMessageTitle("Success!")
           setMessageContent("Product has been listed!")
           openDialog();
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

        <TextField label='Product-Brand' placeholder='Product Brand' fullWidth required style={margin} 
        input value={prodBrand} onChange={(event) => handleOnChange(event, setBrand)}></TextField> 
 
        <TextField label='Product-Price' placeholder='Product Price' fullWidth required style={margin} 
        input value={prodPrice} onChange={(event) => handleOnChange(event, setPrice)}></TextField> 

        <TextField label='Product-Quantity' placeholder='Product Quantity' fullWidth required style={margin} 
        input value={prodQuantity} onChange={(event) => handleOnChange(event, setQuantity)}></TextField>

        <TextField label='Product-Description' placeholder='Product Description' fullWidth required multiline rows="10" style={margin} 
        input value={prodDescription} onChange={(event) => handleOnChange(event, setDescription)}></TextField> 


      <p>Add Product Image</p>
      <Input type="file" value={imgName} onChange={addProductImage} alt="image"/>

       <Grid>
          <Button onClick = {handleSellProduct} variant="contained" style={{ margin: "20px", backgroundColor:"white" , color:"black"}}>Sell This Item</Button>
       </Grid>
       
       <Dialog open={open}>
                <DialogTitle>{msgTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{msgContent}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)}>Close</Button>
                </DialogActions>
        </Dialog>

       
   </Grid>

    )
}

export default Sell;