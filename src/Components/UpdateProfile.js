import React, { useState } from "react";
import { Grid,TextField, Typography,Button } from "@mui/material";
  

const UpdateProfile = ()=>{
    const paperStyle = {padding:20, height:'70vh',width:'50vh',margin:'20px auto'}
    const avatarStyle = {backgroundColor:'grey', width:'70px', height:'70px'}
    const margin={margin:'30px auto'}
    const buttonStyle ={margin:'20px auto'}

    const [userName,setUserName] = useState("")
    const [Passcode,setPassword] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userPhone,setUserPhone] = useState("")

    const handleOnChange = (event, handler) => {
        console.log(event.target.value)
        handler(event.target.value)
    }

    const handleUpdate = ()=>{
        console.log("updated")
    }
    return(
  <>
    <Grid>
    <Grid  align='center'>
    <Typography>Update My Profile</Typography>
    </Grid>

      
      <TextField 
        
        label='Username' placeholder='Update  username' fullWidth  style={margin} 
        input value={userName} onChange={(event) => handleOnChange(event, setUserName)}></TextField>

       <TextField label='Password' placeholder='Update password' fullWidth style={margin} 
       input value={Passcode} onChange={(event) => handleOnChange(event, setPassword)}></TextField> 

      
        <TextField label='Email' placeholder='Update Email' fullWidth  style={margin} 
       input value={Passcode} onChange={(event) => handleOnChange(event, setPassword)}></TextField>  


        <TextField label='Phone Number' placeholder='Update Phone Number' fullWidth  style={margin} 
       input value={Passcode} onChange={(event) => handleOnChange(event, setPassword)}></TextField> 

         <Grid align='center'>
               <Button onClick={handleUpdate} href= "/user" type='submit' color='primary' variant="contained" style= {buttonStyle} fullWidth required disableElevation>Submit Changes</Button>
        </Grid>

   </Grid> 

   </>
    )
}

export default UpdateProfile;