import React, { useState, useContext } from "react";
import { Grid,TextField, Typography,Button } from "@mui/material";
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

    const handleUpdate = ()=>{
        

        const obj = {
           username : userName,
           password : Passcode,
           email : userEmail,
           address : userAddress
        }
        if(obj.username===null) {
          delete obj.username
        }
        if(obj.password===null) {
          delete obj.password
        }
        if(obj.email===null) {
          delete obj.usemailername
        }
        if(obj.address===null) {
          delete obj.address
        }

        axios.put('/api/profile/update',obj,options)
        .then(response =>{
              if(response.data.status === "successfully updated user profile"){
                console.log("updated")
              }
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