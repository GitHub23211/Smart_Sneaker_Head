import React, { useState } from "react";
import axios from "axios";
import { Paper, Button, TextField, Grid, Input} from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions}  from "@mui/material";
import Dropzone from 'react-dropzone'
 

const Sell = ()=>{

    const [prodTitle , setTitle] = useState("")
    const [prodDescription , setDescription] = useState("")
    const [prodPrice , setPrice] = useState("")
    const [prodQuantity , setQuantity] = useState("")
    const [prodBrand , setBrand] = useState("")
    const [productImgs, setProductImgs] = useState([])

    const [open,setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent , setMessageContent] = useState("") 

    const openDialog= ()=>{
        setOpen(true);
    }

    const margin={margin:'30px auto'}
    
    const imgUploadStyle = {
        border: "solid 1px black",
        padding: "1%",
        fontWeight : "500"
    }

    const filenameStyle = {
        fontWeight : "400"
    }

    const acceptedFileTypes = {
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/png": [".png"]
    }

    const handleOnChange = (event, handler) => {
        handler(event.target.value)
    }

    const handleImages = (files) => {
        if(productImgs.length < 3) {
            setProductImgs(productImgs.concat(files))
        }
        else {
            setMessageTitle("File limit reached!")
            setMessageContent("Cannot upload more than 3 files!")
            openDialog();
        }
    }

    const imageListItem = (file) => {
        return (
            <div key={file.name}>
                {file.name} 
            </div>
        )
    }

    const handleSellProduct = ()=>{
        if(productImgs) {
          const imageData = new FormData()
          productImgs.map(img => imageData.append("products", img))
          axios.post("/api/upload/product", imageData)
          .then(response => response.data.filenames)
          .then(filenames => sendInfo(filenames))
          .catch(error => console.log(error.toString()))
        }
        else {
          sendInfo([])
        }
    }

    const sendInfo = (names)=>{
        const product = {
            name: prodTitle,
            price: prodPrice,
            description: prodDescription,
            quantity: prodQuantity,
            brand: prodBrand,
            picture: names
        }

        axios.post(`/api/product/register`,  product)
        .then(response=>{
           console.log(response)
           setTitle("")
           setDescription("")
           setPrice("")
           setQuantity("")
           setBrand("")
           setProductImgs([])
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


      <Dropzone onDropAccepted={files => handleImages(files)} accept={acceptedFileTypes}>
        {({getRootProps, getInputProps}) => (
            <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p style={imgUploadStyle}>
                    Drag 'n' drop some files here, or click to select files
                    <div style={filenameStyle}>
                        {productImgs ? productImgs.map(file => imageListItem(file)) : <></> }
                    </div>
                  </p>
                </div>
            </section>
        )}
      </Dropzone>

      <Button onClick={() => setProductImgs([])}>
            Remove all files
        </Button>

      <Grid>
          <Button onClick = {handleSellProduct} variant="contained" style={{ margin: "20px", backgroundColor:"white" , color:"black"}}>
            Sell This Item
        </Button>
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