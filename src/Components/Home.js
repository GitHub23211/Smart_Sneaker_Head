import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "../Styles/home.css";
import axios from "axios";
import HomePageProduct from "./HomePageProduct";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

    const [tmpProdList, setTmpProdList] = useState([]);
    
    useEffect (()=>{
         //get 3 random product detils
         let tmpList = [];
        axios.get('/api/product')
        .then(response =>{
            const size = response.data.products.length;
            for(let i=0; i<3; i++) {
             const index = Math.floor(Math.random() * size);
             console.log("index:" + index);
             tmpList.push( response.data.products[index]);
           }
           setTmpProdList(tmpList);
        })
    },[]);
   
    return(  
    <section className="home-container">
        <section className="home-banner">
           <h1>Banner</h1>
        </section>

        <section className="home-products">
                <Carousel slide={false}>
                  {tmpProdList.map( (p) => {
                    return (
                      <Carousel.Item>
                        <HomePageProduct data={p}/>
                      </Carousel.Item>
                    )
                    }
                 )}
                 </Carousel>
        </section>

        <section className="home-about-us">
          <h3>about</h3>
        </section>
        <section className="home-footer">
            <Typography>
                Copyright © SmartShopper
            </Typography>
        </section>
    </section>
    )
}

export default Home;