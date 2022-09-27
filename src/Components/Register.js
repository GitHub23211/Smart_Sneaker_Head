import React from "react";
import { Avatar, Grid , Paper, TextField , Button , FormGroup , FormControlLabel ,Checkbox} from "@mui/material";
import {Dialog , DialogTitle , DialogContent , DialogContentText , DialogActions}  from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from "react";
import axios from "axios";


const Register= ()=>{

    const [userName , setUserName] = useState("")
    const [email , setEmail] = useState("")
    const [Passcode , setPassword] = useState("")
    const [confirmpassword , setConfirmPassword] = useState("") 

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

    const handleRegistration = (event)=>{
        event.preventDefault();
        console.log("registeration called")

        const userObj = {
           username : userName ,
           password : Passcode ,
           email : email
        }        
        //post request to register user 
       axios.post("http://localhost:5001/auth/register", userObj)
       .then(response => {
              console.log(response.data)
              setMessageTitle("Thank you for Registering!")
              setMessageContent("Please proceed to Login to start shopping!")
              //resert the form
              setUserName("")
              setEmail("")        
              setPassword("")
              setConfirmPassword("")
              openDialog();
           }
         ).catch(error => {
            console.log(error)
            setMessageTitle("Username Already Taken!")
            setMessageContent("Please enter another username.") 
            openDialog();
          })

         console.log("msg" ,msgTitle )
         openDialog();
    }


    const paperStyle = {padding:20, height:'80vh',width:'70vh',margin:'20px auto'}
    const avatarStyle = {backgroundColor:'grey', width:'70px', height:'70px'}
    const margin={margin:'20px auto'}
    const buttonStyle ={margin:'20px auto'}
    return(
        <Grid>
            <Paper elevation={20}  style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><PersonOutlineIcon /></Avatar>    
                <h2>Register Now</h2>
                <p>Please fill this form to create an account!</p>
            </Grid>    
            <TextField label='Username' placeholder='Enter username' fullWidth required style={margin} input value={userName} onChange={(event) => handleOnChange(event, setUserName)}></TextField>
            <TextField label='Email' placeholder='Enter email' fullWidth required style={margin} input value = {email} onChange={(event) => handleOnChange(event, setEmail)}></TextField>
            <TextField label='Password' placeholder='Enter password' type = 'password' fullWidth required style={margin} input value={Passcode} onChange={(event) => handleOnChange(event, setPassword)}></TextField>
            <TextField label='Confirm Password' placeholder='Enter password again' type = 'password' fullWidth required style={margin} input value={confirmpassword} onChange={(event) => handleOnChange(event, setConfirmPassword)}></TextField>
             
            <FormGroup>
                 <FormControlLabel control={<Checkbox  />} label="I accept the terms and conditions." />
            </FormGroup>

            <Grid align='center'>
               <Button onClick={handleRegistration} type='submit' color='primary' variant="contained" style= {buttonStyle} fullWidth required disableElevation>Sign Up</Button>
            </Grid>
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

export default Register;