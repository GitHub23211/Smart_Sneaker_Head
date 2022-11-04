import { React,useState, useEffect } from "react";
import {Avatar,Typography} from "@mui/material";
import axios from "axios";
import LoginContext from '../../LoginContext';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


const SellerProfile = ()=>{

    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userAddress,setUserAddress] = useState("")
    const [avatar, setAvatar] = useState("")
    const [abn,setABN] = useState("")
    const [companyName, setCompanyName] = useState("")

    useEffect(() => {
        axios.get('/auth/seller')
        .then(response => {
            console.log(response.data)
            if(response.data.status === "success"){
                setUserName(response.data.username)
                setUserEmail(response.data.email)
                setUserAddress(response.data.address)
                setAvatar(response.data.avatar)
                setABN(response.data.abn)
                setCompanyName(response.data.companyName)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])
 

    return(
      <section className="user-card">
          {avatar ? <img src={`/user/image/${avatar}`} style={{maxWidth:200, maxHeight:200}} alt="avatar"/> : <Avatar sx={{ width: '100px', height: '100px' }}><PersonOutlineIcon sx={{ width: '100px', height: '100px' }}/></Avatar>}
          <h1>Name : {userName}</h1>
          <Typography><MailOutlineIcon/>{userEmail}</Typography>
          <Typography><LocationOnIcon />{userAddress}</Typography>
          <Typography>ABN: {abn}</Typography>
          <Typography>Company Name: {companyName}</Typography>
      </section>
    )
}

export default SellerProfile;