import React from "react";
import { Navigate , Link } from 'react-router-dom';
import { Paper ,Button, Typography } from "@mui/material";


import "../Styles/register.css";

const Register = () =>{

    return(

       <Paper elevation={24} style={{margin:"40px"}}>
 
      <section className="register-container">
        <section className="register-left">
        </section>

        <section className="register-right">
         <h1>REGISTRATION</h1>   
         <p className="register-text">Become a Smart Sneaker Seller!
        <Link  style={{color:"black" , textDecoration: 'none'}}  to = "/register/seller">
            <Button variant="contained" style={{backgroundColor:'white' , margin:"20px 10px",color: "black"}} >Seller Account</Button>
          </Link>
        </p>    

        <p className="register-text"> Start Sneaker Shopping! 
          <Link style={{color:"black" , textDecoration: 'none'}}  to = "/register/user" >
            <Button variant="contained"  style={{ backgroundColor:'white', margin:"20px 10px" , color: "black"}} >User Account</Button>
          </Link>
        </p>  
        </section>
       </section>

       </Paper> 

    )
}


export default Register;