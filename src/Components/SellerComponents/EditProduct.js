import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Dropzone from "react-dropzone"
import axios from "axios"

import {Grid, Box, Button, TextField} from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions}  from "@mui/material";

const EditProduct = () => {

    const productid = useParams().productid //63624b9b83d04c438234e844
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [pictures, setPictures] = useState({})
    const [mainView, setMainView] = useState(null)
    const [secondView, setSecondView] = useState(null)
    const [thirdView, setThirdView] = useState(null)

    const[open, setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent, setMessageContent] = useState("") 

    const margin = {
        margin:'30px auto'
    }

    const imgStyle = {
        maxWidth: "150px",
        maxHeight: "150px"
    }

    const imgUploadStyle = {
        border: "solid 1px black",
        margin:'30px auto',
        padding: "1%",
        paddingBottom: "5vh",
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

    const handleImages = (files, imageHandler) => {
        imageHandler(files[0])
    }

    const clearImages = () => {
        setMainView(null)
        setSecondView(null)
        setThirdView(null)
    }

    const createDropzone = (label, image, view, imageHandler) => {
        return (
            <>
            <Dropzone onDropAccepted={files => handleImages(files, imageHandler)} accept={acceptedFileTypes}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()} style={imgUploadStyle}>
                        <input {...getInputProps()} />
                        <p>
                            {label}
                            <div style={filenameStyle}>
                                {image ? image.name : <></>}
                            </div>
                        </p>
                        {view ? view.name : image ? <img style={imgStyle} src={`/product/image/${image}`} alt=''/> : <></>}
                        </div>
                    </section>
                )}
            </Dropzone>
            </>
        )
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

    const handleFilenames = (filenames) => {
        const names = {
            mainView: pictures.mainView,
            secondView: pictures.secondView,
            thirdView: pictures.thirdView
        }
        if(mainView) {
            names.mainView = filenames[0]
        }
        if(secondView) {
            names.secondView = filenames[1] ? filenames[1] : filenames[2] ? filenames[2] : filenames[0]
        }
        if(thirdView) {
            names.thirdView = filenames[2] ? filenames[2] : filenames[1] ? filenames[1] : filenames[0]
        }
        return names
    }

    const handleUpdateProduct = ()=>{
        const productImgs = createImageArray()
        if(productImgs.length > 0) {
          const imageData = new FormData()
          productImgs.map(img => imageData.append("products", img))
          axios.post("/api/upload/product", imageData)
          .then(response => response.data.filenames)
          .then(filenames => sendInfo(handleFilenames(filenames)))
          .catch(error => console.log(error.toString()))
        }
        else {
          sendInfo(pictures)
        }
    }

    const sendInfo = (pictures) => {
        const product = {
            name: name,
            price: price,
            description: description,
            quantity: quantity,
            brand: brand,
            pictures: pictures
        }

        axios.put(`/api/product/update/${productid}`,  product)
        .then(response=>{
           console.log(response)
            setName("")
           setDescription("")
           setPrice("")
           setQuantity("")
           setBrand("")
           setPictures({})
           clearImages()
           setMessageTitle("Success!")
           setMessageContent("Product has been updated!")
           setOpen(true)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const setProduct = (product) => {
        setName(product.name)
        setBrand(product.brand)
        setPrice(product.price)
        setQuantity(product.quantity)
        setDescription(product.description)
        setPictures(product.pictures)
    }

    useEffect(() => {
        axios.get(`/api/product/${productid}`)
        .then(response => setProduct(response.data.product))
        .catch(error => {
            setMessageTitle("Error")
            setMessageContent("Error has occurred")
            setOpen(true)
        })
    }, [])

    return (
        <div>
            <Box container sx={{display:"grid", gridTemplateColumns: "1fr 2fr", gap: "10px"}}>
                <Grid item>
                    {createDropzone("Main View", pictures.mainView, mainView, setMainView)}
                    {createDropzone("Second View", pictures.secondView, secondView, setSecondView)}
                    {createDropzone("Third View", pictures.thirdView, thirdView, setThirdView)}

                    <Button onClick={clearImages}>
                        Remove all files
                    </Button>
                </Grid>

                <Grid item>
                    <TextField label='Product-Title' placeholder='Product Title' fullWidth required style={margin} 
                    input value={name} onChange={(event) => handleOnChange(event, setName)}></TextField> 

                    <TextField label='Product-Brand' placeholder='Product Brand' fullWidth required style={margin} 
                    input value={brand} onChange={(event) => handleOnChange(event, setBrand)}></TextField> 
            
                    <TextField label='Product-Price' placeholder='Product Price' fullWidth required style={margin} 
                    input value={price} onChange={(event) => handleOnChange(event, setPrice)}></TextField> 

                    <TextField label='Product-Quantity' placeholder='Product Quantity' fullWidth required style={margin} 
                    input value={quantity} onChange={(event) => handleOnChange(event, setQuantity)}></TextField>

                    <TextField label='Product-Description' placeholder='Product Description' fullWidth required multiline rows="10" style={margin} 
                    input value={description} onChange={(event) => handleOnChange(event, setDescription)}></TextField> 
                </Grid>
            </Box>

            <Grid>
                <Button onClick = {handleUpdateProduct} variant="contained" style={{ margin: "20px", backgroundColor:"white" , color:"black"}}>
                    Update Product
                </Button>
            </Grid>

            <Dialog open={open}>
                <DialogTitle>{msgTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{msgContent}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
        </Dialog>   
        </div>
    )
}

export default EditProduct