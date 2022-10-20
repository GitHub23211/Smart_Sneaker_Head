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
            for(let i=0; i<4; i++) {
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
        
        <section className="home-highlight">
            <section className="home-highlight-child">
            Sport keeps us fit. Keeps you mindful. Brings us together. Through sport we have the power to change lives. Whether it is through stories of inspiring athletes. Helping you to get up and get moving. Sporting goods featuring the latest technologies, to up your performance. Beat your PB. Our sport shop offers a home to the runner, the basketball player, the soccer kid, the fitness enthusiast. The weekend hiker that loves to escape the city. The yoga teacher that spreads the moves. The 3-Stripes are seen in the music scene. On stage, at festivals. The clothing at our sports store keeps you focused before that whistle blows. During the race. And at the finish lines. We’re here to support creators. Improve their game. Their lives. And change the world.
            </section>
            <section className="home-highlight-child">
                Put some colour here or image of a logo or shoe
            </section>

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
          <p>Our vision </p>
          <p>We see a world where everybody is an athlete — united in the joy of movement. Driven by our passion for sport and our instinct for innovation, we aim to bring inspiration to every athlete in the world and to make sport a daily habit.</p>
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