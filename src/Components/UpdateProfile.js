import React, { useState, useContext } from "react";
import { Grid,TextField, Typography,Button,Input } from "@mui/material";
import axios from "axios";
import LoginContext from '../LoginContext';  
import {Link} from 'react-router-dom';

const UpdateProfile = ()=>{
    const paperStyle = {padding:20, height:'70vh',width:'50vh',margin:'20px auto'}
    const avatarStyle = {backgroundColor:'grey', width:'70px', height:'70px'}
    const margin={margin:'30px auto'}
    const buttonStyle ={margin:'20px auto'}

    const [userName,setUserName] = useState(null)
    const [Passcode,setPassword] = useState(null)
    const [userEmail,setUserEmail] = useState(null)
    const [userPhone,setUserPhone] = useState(null)
    const [userAddress,setUserAddress] = useState(null)
    const [avatar, setAvatar] = useState(null)

    const {isLogin, setLogin , userToken , setToken} = useContext(LoginContext);

    const options = {
        headers: {
            'Authorization': `bearer ${userToken}`
        }
    };

    const handleOnChange = (event, handler) => {
        console.log(event.target.value)
        handler(event.target.value)
    }

    const grabAvatar = (event) => {
      const file = event.target.files[0]
      if(file.type === "image/jpeg" || file.type === "image/jpg") {
        const imageData = new FormData()
        imageData.append("avatar", file)
        axios.post("/api/upload/avatar", imageData, options)
             .then(response => setAvatar(response.data.filename))
             .catch(error => console.log(error.toString()))
      }
    }

    const handleUpdate = ()=>{
        

        const obj = {
           username : userName,
           password : Passcode,
           email : userEmail,
           address : userAddress,
           avatar: avatar
        }
        if(obj.username===null) {
          delete obj.username
        }
        if(obj.password===null) {
          delete obj.password
        }
        if(obj.email===null) {
          delete obj.email
        }
        if(obj.address===null) {
          delete obj.address
        }
        if(obj.avatar===null) {
          delete obj.avatar
        }

        axios.put('/api/profile/update',obj,options)
        .then(response =>{
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
    }
    return(
  <>
    <Grid>
    <Grid  align='center'>
    <Typography>Update My Profile</Typography>
    </Grid>

      <TextField label='Username' placeholder='Update  username' fullWidth  style={margin} 
        input value={userName} onChange={(event) => handleOnChange(event, setUserName)}></TextField>

       <TextField label='Password' placeholder='Update password' fullWidth style={margin} 
       input value={Passcode} onChange={(event) => handleOnChange(event, setPassword)}></TextField> 

      
        <TextField label='Email' placeholder='Update Email' fullWidth  style={margin} 
       input value={userEmail} onChange={(event) => handleOnChange(event, setUserEmail)}></TextField>  

      
        <TextField label='Phone Number' placeholder='Update Phone Number' fullWidth  style={margin} 
       input value={userPhone} onChange={(event) => handleOnChange(event, setUserPhone)}></TextField>

      <TextField label='Address' placeholder='Update Address' fullWidth  style={margin} 
       input value={userAddress} onChange={(event) => handleOnChange(event, setUserAddress)}></TextField> 

       <Input type="file" onChange={grabAvatar}/>

      <Grid align='center'>
        <Link to = "/user">
        <Button onClick={handleUpdate}type='submit' color='primary' variant="contained" 
        style= {buttonStyle} fullWidth required disableElevation>Submit Changes</Button>
         </Link>
      </Grid>
   </Grid> 

   </>
    )
}

export default UpdateProfile;