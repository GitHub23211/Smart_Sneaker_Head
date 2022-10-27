import React, { useState } from "react";
import { Grid,TextField, Typography,Button,Input } from "@mui/material";
import axios from "axios";
import {Link} from 'react-router-dom';

const UpdateProfile = ()=>{
    const margin={margin:'30px auto'}
    const buttonStyle ={margin:'20px auto'}

    const [userName,setUserName] = useState(null)
    const [Passcode,setPassword] = useState(null)
    const [userEmail,setUserEmail] = useState(null)
    const [userAddress,setUserAddress] = useState(null)
    const [avatar, setAvatar] = useState(null)

    const handleOnChange = (event, handler) => {
        handler(event.target.value)
    }

    const grabAvatar = (event) => {
      const file = event.target.files[0]
      if(file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
        setAvatar(file)
      }
    }

    const handleRemoveAvatar = (event) => {
      sendInfo("remove")
    }

    const handleUpdate = ()=>{
        if(avatar) {
          const imageData = new FormData()
          imageData.append("avatar", avatar)
          axios.post("/api/upload/avatar", imageData)
          .then(response => response.data.filename)
          .then(response => sendInfo(response))
          .catch(error => console.log(error.toString()))
        }
        else {
          sendInfo(null)
        }
    }

    const sendInfo = (avatar) => {
      const obj = {
        username : userName,
        password : Passcode,
        email : userEmail,
        address : userAddress,
        avatar : avatar
     }

      if(avatar === "remove") {
        obj.avatar = ""
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

      axios.put('/api/profile/update',obj)
      .then(response =>{
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
    return(
  <>
    <Grid>
    <Grid  align='center'>
    <Typography>UPDATE PROFILE</Typography>
    </Grid>

      <TextField label='Username' placeholder='Update  username' fullWidth  style={margin} 
        input value={userName} onChange={(event) => handleOnChange(event, setUserName)}></TextField>

       <TextField label='Password' placeholder='Update password' fullWidth style={margin} 
       input value={Passcode} onChange={(event) => handleOnChange(event, setPassword)}></TextField> 

      
        <TextField label='Email' placeholder='Update Email' fullWidth  style={margin} 
       input value={userEmail} onChange={(event) => handleOnChange(event, setUserEmail)}></TextField>  

      <TextField label='Address' placeholder='Update Address' fullWidth  style={margin} 
       input value={userAddress} onChange={(event) => handleOnChange(event, setUserAddress)}></TextField> 

      <p>Add Profile Image</p>

      <Input type="file" onChange={grabAvatar} alt="avatar"/>
      <Grid align='center'>
        <Link to = "/user">
          <Button onClick={handleRemoveAvatar}type='submit' color='secondary' variant="contained" 
          style= {buttonStyle} disableElevation>Remove Profile Image</Button>
        </Link>
      </Grid>
      

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