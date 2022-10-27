import React, { useEffect, useState } from "react";
import { Typography, Divider,Button } from "@mui/material";
import "../Styles/home.css";
import axios from "axios";
import HomePageProduct from "./HomePageProduct";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Home = () => {

    const [tmpProdList, setTmpProdList] = useState([]);
    
    useEffect (()=>{
         //get 3 random product detils
         let tmpList = [];
        axios.get('/api/product')
        .then(response =>{
            console.log(response)
            const size = response.data.products.length;
            let range = []
            for (let i=0; i< size; i++){
                range.push(i)
            }
            console.log("here is the range"+range)
            for (let i =range.length -1; i > 0; i--) {  //Fisher–Yates Shuffle
                let j = Math.floor(Math.random() * i)
                let k = range[i]
                range[i] = range[j]
                range[j] = k
              }
            for(let i=0; i<4; i++) {
             console.log("index:" + range[i]);
             tmpList.push( response.data.products[range[i]]);
           }
           setTmpProdList(tmpList);
        })
    },[]);
   
    return(  

     <>

    <section className="top-bar">
      <Carousel indicators={false} >
        <Carousel.Item>
          <h2>Welcome to Smart Sneaker Head!</h2>
        </Carousel.Item>
        <Carousel.Item>
             <p>Free Delivery for all orders over $150.</p>
        </Carousel.Item>
       </Carousel>
      </section>

       <section className="home-banner-1">
          <img src="./images/Sneaker_Image_Left.png" width="500px" height="500px" alt="left"/>
          <img src="./images/Quote_Image.png" width="600px" height="500px" alt="quote"/>
          <img src="./images/Sneaker_Image_Right.png" width="500px" height="500px" alt="right"/>
       </section>

       <section className="home-banner-2">
       <img src="./images/banner_2_Image.png" width="auto" height="auto" alt="left"/>
       </section>

       <section className="home-products">
                <Carousel slide={false} variant="dark">
                  {tmpProdList.map( (p) => {
                    return (
                      <Carousel.Item>
                        <section className="item">
                        <HomePageProduct key={p.id} data={p}/>
                        </section>
                      </Carousel.Item>
                    )
                    }
                 )}
                </Carousel>
        </section>
        <section className="home-banner-3">
         <img src="./images/banner3_image_1.png" width="100px" height="auto" alt="left"/>
         <img src="./images/banner3_image_2.png" width="100px" height="auto" alt="left"/>
         <img src="./images/banner3_image_3.png" width="120px" height="auto" alt="left"/>
         <img src="./images/banner3_image_4.png" width="100px" height="auto" alt="left"/>
         <img src="./images/banner3_image_5.png" width="100px" height="auto" alt="left"/>
       </section>

       <section className="home-about-section">

        <section className="about-section-right">
         <h1>Authenticity Guaranteed</h1>
        </section>

        <section className="about-section-left">
         <h1 className="about-section-title">Smart Sneaker Head</h1>
         <h2 className="about-section-title">About</h2>
            <Button size="large" variant="contained" sx={{backgroundColor:"white",color:"black",borderRadius:25 , mt:"280px",ml:"250px"}}>Search More</Button>
        </section>

       </section>

       <section className="home-footer">
            <Divider>
            <Typography>
                 © Smart Sneaker Head, 2022. All Rights Reserved.
            </Typography>
            </Divider>
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
            <YouTubeIcon />

        </section>

       

       </>

    )

}

export default Home;