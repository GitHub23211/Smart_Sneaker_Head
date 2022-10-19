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
            for(let i=0; i<3; i++) {
             console.log("index:" + range[i]);
             tmpList.push( response.data.products[range[i]]);
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
                        <section className="item">
                        <HomePageProduct key={p.id} data={p}/>
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