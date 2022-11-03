import React, { useState, useContext, useEffect } from "react";
import { Button, MenuItem, FormControl, InputLabel, Select, Box} from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../Styles/product.css';
import ProductContext from '../ProductContext';
import axios from "axios"
import Rating from '@mui/material/Rating';
import Carousel from 'react-bootstrap/Carousel';
import LoginContext from '../LoginContext';

import Review from './UserComponents/Review'
import ReviewForm from './UserComponents/ReviewForm'


const Product =()=>{

  const [count, setCount] = useState(0)
  const [reviews, setReviews] = useState([])
  const {product} = useContext(ProductContext);
  const {isLogin,loginType} = useContext(LoginContext);


  const[open,setOpen] = useState(false)
  const [msgTitle, setMessageTitle] = useState("") 
  const [msgContent , setMessageContent] = useState("") 

  const imgStyle = {
    maxWidth: "300px",
    maxHeight: "300px"
  }

  const IncNum = () => {
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
    }
  };

  const ProdObj = {
    productid : product.id,
    quantity : count
  }

  const getReviews = () => {
    axios.get(`/api/review/${product.id}`)
         .then(response => {
            setReviews(response.data.reviews)
            calculateProductRating()
         })
         .catch(error => console.log(error))
  }
  
  const calculateProductRating = () => {
    const totalRating = reviews.reduce(function (total, review) {return total + review.rating}, 0)
    if(reviews.length > 0) {
      setValue(totalRating/reviews.length)
    }
    else {
      setValue(0)
    }
  }

  const handleAddToCart = ()=>{
    if(count > 0){
      axios.put(`/api/cart/add/${product.id}`,ProdObj)
      .then(response =>{
        console.log(response)
      }).catch(error=>{
          console.log(error.response.data.error)
          setMessageTitle("Error")
          setMessageContent(error.response.data.error)
          setOpen(true)
      })
    }else{
      setMessageTitle("Error")
      setMessageContent("Please enter the quantity")
      setOpen(true)
    }
  }

  useEffect(() => {
    getReviews()
  }, [])

  const [size, setSize] = React.useState('');
  const [value, setValue] = useState(4);

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  //axios call to get product details
  // add login first before adding to cart
  
  if( isLogin === true && loginType==="seller") {return(
      <section className="single-product-container">
        <section className="product-container">
        <section className="product-img-section">
        <Carousel slide={false} variant="dark">
          {Object.values(product.pictures).map( (image) => {
            return (
              <Carousel.Item>
                <section className="item">
                <img style={imgStyle} className="product-img" src={`/product/image/${image}`} alt=''></img>
                </section>
              </Carousel.Item>
            )
          })}   
        </Carousel>
        </section>

        <section className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <Rating size="large" name="read-only" value={value} readOnly />

          <p className="product-price"> AU${product.price}</p>
          <section className="counter" >
          <Button size="small" style={{backgroundColor:"white", color: 'black', margin:'auto 5px'}}  variant="outlined" onClick={DecNum}><RemoveIcon /></Button>
              <h4>{count}</h4>
          <Button size="small" color="primary" style={{backgroundColor:"white", color: 'black',margin:'auto 5px'}} variant="outlined" onClick={IncNum} ><AddIcon /></Button>
          </section>
          <Box alignItems="center"
             justifyContent="center"
             sx={{width: 197, ml:"150px", mt:"20px"}}>
            <FormControl variant="filled" fullWidth  >
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
             <Select
              labelId="demo-simple-select-label"
                  id="demo-simple-select"
                value={size}
                label="Size"
                  onChange={handleChange}
                    >
              <MenuItem value={10}>US 5</MenuItem>
              <MenuItem value={10}>US 6</MenuItem>
              <MenuItem value={10}>US 7</MenuItem>
              <MenuItem value={10}>US 8</MenuItem>
              <MenuItem value={10}>US 9</MenuItem>
            </Select>
          </FormControl>
            </Box>
   
          <h3>Features :</h3>
          <p className="product-description"> {product.description} </p>
          
        </section>
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
        <section>
          <h1>Size Chart</h1>
          <img src="./images/Sizechart.png" width="1000vh" height="auto" alt="left"/>
        </section>
      </section>
    )} else {
      return(
        <section className="single-product-container">
          <section className="product-container">
          <section className="product-img-section">
          <Carousel slide={false} variant="dark">
            {Object.values(product.pictures).map( (image) => {
              return (
                <Carousel.Item>
                  <section className="item">
                  <img style={imgStyle} className="product-img" src={`/product/image/${image}`} alt=''></img>
                  </section>
                </Carousel.Item>
              )
            })}   
          </Carousel>
          </section>
  
          <section className="product-details-section">
            <h1 className="product-title">{product.name}</h1>
            <Rating size="large" name="read-only" value={value} readOnly />
  
            <p className="product-price"> AU${product.price}</p>
            <section className="counter" >
            <Button size="small" style={{backgroundColor:"white", color: 'black', margin:'auto 5px'}}  variant="outlined" onClick={DecNum}><RemoveIcon /></Button>
                <h4>{count}</h4>
            <Button size="small" color="primary" style={{backgroundColor:"white", color: 'black',margin:'auto 5px'}} variant="outlined" onClick={IncNum} ><AddIcon /></Button>
            </section>
            <Box alignItems="center"
               justifyContent="center"
               sx={{width: 197, ml:"150px", mt:"20px"}}>
              <FormControl variant="filled" fullWidth  >
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
               <Select
                labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  value={size}
                  label="Size"
                    onChange={handleChange}
                      >
                <MenuItem value={10}>US 5</MenuItem>
                <MenuItem value={10}>US 6</MenuItem>
                <MenuItem value={10}>US 7</MenuItem>
                <MenuItem value={10}>US 8</MenuItem>
                <MenuItem value={10}>US 9</MenuItem>
              </Select>
            </FormControl>
              </Box>
            <section> 
              <Button size="large" onClick={handleAddToCart} variant="contained" style={{ width:250, backgroundColor:"black",color:"white", marginTop:"30px",marginBottom:"30px", borderRadius: 25,maxHeight: '90px'}} >Add to Cart</Button>
            </section>
  
            <h3>Features :</h3>
            <p className="product-description"> {product.description} </p>
            
          </section>
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
          <section style={{margin: "30px"}}>
            <h1>Size Chart</h1>
            <img src="./images/Sizechart.png" width="1000vh" height="auto" alt="left"/>
          </section>

          {isLogin ? <ReviewForm product={product} /> : <></>}
          {reviews ? reviews.map(review => <Review review={review}/>) : <></>}
        </section>
      )
    }
}

export default Product;