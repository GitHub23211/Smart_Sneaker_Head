import { Avatar, Grid,Paper, TextField ,Button, Typography , Link} from "@mui/material";
import {Dialog , DialogTitle , DialogContent , DialogContentText , DialogActions}  from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import React from "react";
import { useState } from "react";
import axios from "axios";



const Login=()=>{
  
    const [userName , setUserName] = useState("")
    const [Passcode , setPassword] = useState("")


    const[open,setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent , setMessageContent] = useState("") 

    const handleOnChange = (event, handler) => {
        console.log(event.target.value)
        handler(event.target.value)
    }

    const openDialog= ()=>{
        setOpen(true);
    }

    const handleLogin = (event) => {
        event.preventDefault();

        const userObj = {
            username : userName ,
            password : Passcode 
         }   

       axios.post("http://localhost:5001/auth/login", userObj)
       .then(response =>{
           console.log(response.data)
           if(response.data.status === "success"){
            // TODO :  redirect to Home Page
              console.log("Logged in")
              //resert the form
              setUserName("")    
              setPassword("")
           }
         }).catch(error => {
            console.log(error.response.status);
            setMessageTitle("Error");
            setMessageContent("Invalid Username or Password");
            openDialog();
          })

    }
    
    const paperStyle = {padding:20, height:'70vh',width:'50vh',margin:'20px auto'}
    const avatarStyle = {backgroundColor:'grey', width:'70px', height:'70px'}
    const margin={margin:'20px auto'}
    const buttonStyle ={margin:'20px auto'}

    return(
        <Grid>
            <Paper elevation={10}  style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><PersonOutlineIcon /></Avatar>    
                <h2>Sign In</h2>
            </Grid>    
            <TextField label='Username' placeholder='Enter username' fullWidth required style={margin} input value={userName} onChange={(event) => handleOnChange(event, setUserName)}></TextField>

            <TextField label='Password' placeholder='Enter password' type = 'password' 
            fullWidth required input value={Passcode} onChange={(event)=> handleOnChange(event,setPassword)}></TextField>

            <Grid align='center'>
               <Button onClick={handleLogin} href= "/user" type='submit' color='primary' variant="contained" style= {buttonStyle} fullWidth required disableElevation>Login</Button>
            </Grid>
            <Typography >
                Don't Have an Account ? 
                <Link href='/register'>
                     Sign Up 
                </Link>
            </Typography>

            <Dialog open={open}>
                <DialogTitle>{msgTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{msgContent}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)}>Okay</Button>
                </DialogActions>
            </Dialog>

            </Paper>
        </Grid>
    )
}
export default Login;