import React from "react";
import { useState, useContext } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Avatar,Typography} from "@mui/material";
import axios from "axios";
import LoginContext from '../../LoginContext';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const UserProfile = ()=>{

    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userPhone,setUserPhone] = useState("")
    const [userAddress,setUserAddress] = useState("")
    const [avatar, setAvatar] = useState("")

    axios.get('/auth/user')
    .then(response => {
        console.log(response.data)
        if(response.data.status === "success"){
            console.log("userToken 1")
            setUserName(response.data.username)
            setUserEmail(response.data.email)
            setUserPhone(response.data.phone)
            setUserAddress(response.data.address)
            setAvatar(response.data.avatar)
            console.log(avatar)
            console.log("userToken 2")

        }
    }).catch(error => {
        console.log(error)
    })
 

    return(
      <section className="user-card">
          {avatar !== "" ? <img src={`/user/image/${avatar}`} style={{maxWidth:200, maxHeight:200}} alt="avatar"/> : <Avatar sx={{ width: '100px', height: '100px' }}><PersonOutlineIcon sx={{ width: '100px', height: '100px' }}/></Avatar>}
          <h1>Name : {userName}</h1>
          <Typography><MailOutlineIcon/>{userEmail}</Typography>
          <Typography><LocationOnIcon />{userPhone}</Typography>
          <Typography><LocalPhoneIcon />{userAddress}</Typography>
      </section>
    )
}

export default UserProfile;