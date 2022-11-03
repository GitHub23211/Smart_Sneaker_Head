import React, { useState, useEffect } from "react";
import { Grid,TextField, Typography,Button,Input } from "@mui/material";
import axios from "axios";
import {Link} from 'react-router-dom';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions}  from "@mui/material";
import "../../Styles/userprofile.css";

const UpdateProfile = ()=>{
    const margin={margin:'30px auto'}
    const buttonStyle ={margin:'20px auto'}

    const [userName,setUserName] = useState("")
    const [Passcode,setPassword] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userAddress,setUserAddress] = useState("")
    const [avatar, setAvatar] = useState(null)
    
    const[open, setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent, setMessageContent] = useState("") 

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
        setUserName("")
        setPassword("")
        setUserEmail("")
        setUserAddress("")
        setAvatar(null)
      })
      .catch(error => {
        console.log(error)
      })

    }
    const setUser = (user) => {
      setUserName(user.username)
      setPassword(user.passCode)
      setUserEmail(user.email)
      setUserAddress(user.address)
      setAvatar(null)
      }

      useEffect(() => {
        axios.get(`/auth/user`)
        .then(response => setUser(response.data))
        .catch(error => {
            setMessageTitle("Error")
            setMessageContent("Error has occurred")
            setOpen(true)
        })
    }, [])

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

      {/* <Input type="file" onChange={grabAvatar} alt="avatar"/> */}
      <input type="file" onChange={grabAvatar} accept="image/png, image/gif, image/jpeg" alt="avatar"/>


      <Grid align='center'>
        <Link to = "/user">
          <Button onClick={handleRemoveAvatar}type='submit'  variant="contained" 
          style= {buttonStyle} disableElevation>Remove Profile Image</Button>
        </Link>
      </Grid>
      

      <Grid align='center'>
        <Link to = "/user">
           <Button onClick={handleUpdate} type='submit' color='primary' variant="contained" 
           style= {buttonStyle} fullWidth required disableElevation>Submit Changes</Button>
         </Link>
      </Grid>
   </Grid> 

   <Dialog open={open}>
                <DialogTitle>{msgTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{msgContent}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
        </Dialog>   

   </>
    )
}

export default UpdateProfile;