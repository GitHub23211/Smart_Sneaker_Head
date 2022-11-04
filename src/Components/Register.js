import React from "react";
import { Link } from 'react-router-dom';
import { Paper, Button, Divider } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import "../Styles/register.css";

const Register = () =>{

  const paperStyle = {padding:20, height:'auto', width:'100vh', margin:'60px auto'};
  const register_button = {backgroundColor:'white', margin:"20px 10px", color: "black"}
  const linkstyle = {color:"black", textDecoration: 'none'}

    return(

      <Paper elevation={2} style={paperStyle}>
         <section className="register-container">
             <section className="register">
                <h1>REGISTRATION</h1>   
                <p className="register-text">Become a Smart Sneaker Seller!
                <Link  style={linkstyle}  to = "/register/seller">
                   <Button variant="contained" style={register_button} size="small" endIcon={<SendIcon />}>Seller</Button>
                </Link>
                </p>    
          <Divider>OR</Divider>
                 <p className="register-text"> Start Sneaker Shopping! 
                <Link style={linkstyle}  to = "/register/user" >
                  <Button variant="contained"  style={register_button} size="small" endIcon={<LocalMallOutlinedIcon />}>User</Button>
                </Link>
                 </p>  
               </section>
          </section>
       </Paper> 

    )
}

export default Register;