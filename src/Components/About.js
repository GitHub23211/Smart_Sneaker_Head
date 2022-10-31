import React from "react";
import "../Styles/about.css";
import { Paper } from "@mui/material";

const About = () =>{
    return(
        <Paper elevation={24} sx={{mt:"20px",mr:"20px", ml:"20px"}}>
          <h1>About Us</h1>
          <section className="video-section">
            <video src = './images/About_us.mp4' autoPlay width="800px" height="auto" controls/>
            <section className="about-us-info">
            <p>Established by four friends in Sydney with a shared obsession and vision to centralise sought-after sneakers. 
               Operating since 2022, Smart Sneaker Head is one of the largest online stores for limited edition shoes! Smart Sneaker Head has always strived to fulfil our customers sneaker needs. 
               You can buy and sell items with ease. 
               We aim to always stock the newest and most popular brands and products so that our customers never miss a drop. 
               Find the latest sneakers from Nike, Nike Jordan, Adidas, Asics and Reebok. </p>
            </section>

        </section>

        </Paper>


    )
}

export default About;