import React from "react";
import { useState } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Avatar,Typography} from "@mui/material";
import axios from "axios";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const UserProfile = ()=>{

    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userAddress,setUserAddress] = useState("")
    const [avatar, setAvatar] = useState("")

    axios.get('/auth/user')
    .then(response => {
        if(response.data.status === "success"){
            setUserName(response.data.username)
            setUserEmail(response.data.email)
            setUserAddress(response.data.address)
            setAvatar(response.data.avatar)
        }
    }).catch(error => {
        console.log(error)
    })
 
    return(
      <section className="user-card">
          {avatar !== "" ? <img src={`/user/image/${avatar}`} style={{maxWidth:200, maxHeight:200}} alt="avatar"/> : <Avatar sx={{ width: '100px', height: '100px' }}><PersonOutlineIcon sx={{ width: '100px', height: '100px' }}/></Avatar>}
          <h1>Name : {userName}</h1>
          <Typography>Email : {userEmail}</Typography>
          <Typography>Address : <LocationOnIcon />{userAddress}</Typography>

      </section>
    )
}

export default UserProfile;