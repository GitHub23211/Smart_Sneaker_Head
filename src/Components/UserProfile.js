import React from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Paper,Avatar,Typography } from "@mui/material";
import axios from "axios";


const UserProfile = ()=>{
    const username = "abc"
    const email = "abc@gmail.com"


    const avatarStyle = {backgroundColor:'grey', width:'70px', height:'70px'}   

    return(
       <>
        <Avatar style={avatarStyle}><PersonOutlineIcon /></Avatar>   
        <Typography>Username : {username}</Typography>
        <Typography> Email : {email}</Typography>
       </>
    )
}

export default UserProfile;