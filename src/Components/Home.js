import React, { useEffect, useState } from "react";
import { Typography,Divider } from "@mui/material";
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
            console.log(response)
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
           <h1>Welcome to Smart Sneaker Head!</h1>
           <Divider>
           <p> Bring power to your steps</p>
            </Divider>
          
        </section>

        <section className="home-products">
                <Carousel slide={false}>
                  {tmpProdList.map( (p) => {
                    return (
                      <Carousel.Item>
                        <section ClassName="item">
                        <HomePageProduct data={p}/>
                        </section>
                      </Carousel.Item>
                    )
                    }
                 )}
                 </Carousel>
        </section>

        <section className="home-about-us">
          <h2>ABOUT</h2>
        </section>
        <section className="home-footer">
            <Divider>
            <Typography>
                 © Smart Sneaker Head, 2022. All Rights Reserved.
            </Typography>
            </Divider>
        </section>
    </section>
    )
}

export default Home;