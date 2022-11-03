import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Grid, Box} from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions}  from "@mui/material";
import Dropzone from 'react-dropzone'
 

const Sell = ()=>{

    const [prodTitle , setTitle] = useState("")
    const [prodDescription , setDescription] = useState("")
    const [prodPrice , setPrice] = useState("")
    const [prodQuantity , setQuantity] = useState("")
    const [prodBrand , setBrand] = useState("")
    const [mainView, setMainView] = useState(null)
    const [secondView, setSecondView] = useState(null)
    const [thirdView, setThirdView] = useState(null)

    const [open,setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent , setMessageContent] = useState("") 

    const openDialog= ()=>{
        setOpen(true);
    }

    const margin={margin:'30px auto'}
    
    const imgUploadStyle = {
        border: "solid 1px black",
        margin:'30px auto',
        padding: "1%",
        paddingBottom: "25vh",
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

    const createUploadArea = (label, image, imageHandler) => {
        return (
            <Grid item>
                <Dropzone onDropAccepted={files => handleImages(files, imageHandler)} accept={acceptedFileTypes}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p style={imgUploadStyle}>
                                {label}
                                <div style={filenameStyle}>
                                    {image ? <img style={{maxWidth: "150px", maxHeight: "150px"}} src={URL.createObjectURL(image)} alt="preview"/> : <></>}
                                </div>
                            </p>
                            </div>
                        </section>
                    )}
                </Dropzone> 
            </Grid>
        )
    }

    const handleOnChange = (event, handler) => {
        handler(event.target.value)
    }

    const handleImages = (files, imageHandler) => {
        imageHandler(files[0])
    }

    const clearImages = () => {
        setMainView(null)
        setSecondView(null)
        setThirdView(null)
    }

    const createImageArray = () => {
        const imageArray = []
        if(mainView) {
            imageArray.push(mainView)
        }
        if(secondView) {
            imageArray.push(secondView)
        }
        if(thirdView) {
            imageArray.push(thirdView)
        }
        return imageArray
    }

    const handleFileNames = (filenames) => {
        return {
            mainView: filenames[0],
            secondView: filenames[1],
            thirdView: filenames[2]
        }
    }

    const handleSellProduct = ()=>{
        const productImgs = createImageArray()
        if(productImgs.length > 0) {
          const imageData = new FormData()
          productImgs.map(img => imageData.append("products", img))
          axios.post("/api/upload/product", imageData)
          .then(response => response.data.filenames)
          .then(filenames => sendInfo(handleFileNames(filenames)))
          .catch(error => console.log(error.toString()))
        }
        else {
          setMessageTitle("Error")
          setMessageContent("Your product needs at least one picture!")
          openDialog()
        }
    }

    const sendInfo = (pictures)=>{
        const product = {
            name: prodTitle,
            price: prodPrice,
            description: prodDescription,
            quantity: prodQuantity,
            brand: prodBrand,
            pictures: pictures
        }

        axios.post(`/api/product/register`,  product)
        .then(response=>{
           console.log(response)
           setTitle("")
           setDescription("")
           setPrice("")
           setQuantity("")
           setBrand("")
           clearImages()
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


        <p>To upload your product's images: Drag each file over the desired view, or click on each view and choose a file to upload</p>
        <Box container sx={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px"}}>
            {createUploadArea("Main View", mainView, setMainView)}
            {createUploadArea("Second View", secondView, setSecondView)}
            {createUploadArea("Third View", thirdView, setThirdView)}
        </Box>

        <Button onClick={clearImages}>
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