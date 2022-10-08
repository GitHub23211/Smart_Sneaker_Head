import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "../Styles/home.css";
import axios from "axios";
import HomePageProduct from "./HomePageProduct";

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
                {tmpProdList.map( (p) => {
                    return (
                      <section className="item">  
                            <HomePageProduct data={p}/>
                      </section>
                    )
                    }
                 )}
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