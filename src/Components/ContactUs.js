import React from "react";
import { Typography, Paper, TextField, Divider } from "@mui/material";

const ContactUs = () =>{
    return(
        <Paper elevation={24} sx={{mt:"20px",mr:"20px", ml:"20px",mb:"20px",pt:"40px",pl:"40px",pr:"40px"}}>
        <h1>CONTACT US</h1> 
        <h4>For all online customer service and order enquiries, please check below</h4>   
        <p>Email:infosmartsneakerhead@gmail.com</p>
        <p>Instagram: @smartsneakerheadsyd</p>
        <p>Facebook: SmartSneakerHead</p>
        <p>NOTE : Please check the description of the item you ordered prior to contacting customer service for shipping enquiries. </p>
        <p>This will state the processing time required for your order prior to your item being shipped out to you.</p>   
        <Divider sx={{ borderBottomWidth: 5 }} />
        <Typography >ALTERNATELY, CONTACT US HERE. WE AIM TO RESPONS WITHIN 48 HOURS </Typography>
        <section>
            <TextField required size="small" sx={{mr:"50px",mt:"20px"}} label="NAME" variant="outlined" />
            <TextField required size="small" sx={{mt:"20px"}} label="PHONE" variant="outlined" />  
        </section>
        <section>
        <TextField required sx={{width:"440px", mt:"20px"}} label="EMAIL" variant="outlined" />

        </section>
        <TextField required multiline rows="10" sx={{width:"440px", mt:"20px" ,mb:"40px"}} label="MESSAGE" variant="outlined" />

     </Paper>
    )
}


export default ContactUs;
