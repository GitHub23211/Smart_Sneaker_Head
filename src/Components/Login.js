import { React, useState, useContext } from "react";
import { Navigate , Link } from 'react-router-dom';
import axios from "axios";
import { Avatar, Grid, Paper, TextField, Button, Typography, FormControl, FormControlLabel, RadioGroup, Radio , Divider,Box } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useCookies } from 'react-cookie';
import LoginContext from '../LoginContext';

const Login=()=>{

    const {setLogin,setLoginType} = useContext(LoginContext);
    
    const [loginType , setType] = useState("")
    const [userName, setUserName] = useState("")
    const [Passcode, setPassword] = useState("")
    const [flag,setFlag] = useState(false)

    const[open,setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent , setMessageContent] = useState("") 

    const [cookies, setCookie, removeCookie] = useCookies(['login_type']);


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
            username : userName,
            password : Passcode 
         }   

       axios.post("auth/login", userObj)
       .then(response =>{
           if(response.data.status === "success"){
              //resert the form
              setUserName("")    
              setPassword("")
              setFlag(true);
              setLogin(true);
              setLoginType(loginType)
              setCookie('LoginType', loginType, { path: '/' });

           }
         }).catch(error => {
            setMessageTitle("Error");
            setMessageContent("Invalid Username or Password");
            openDialog();
          })

    }

    
    const paperStyle = {padding:20, height:'auto', width:'50vh', margin:'20px auto'}
    const avatarStyle = {backgroundColor:'grey', width:'70px', height:'70px'}
    const margin={margin:'20px auto'}
    const buttonStyle ={margin:'20px auto'}
        if(flag === false){
            return (
            <Grid>
                <Paper elevation={10}  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle} size="large"><PersonOutlineIcon /></Avatar>    
                    <h2>Sign In</h2>
                </Grid>    
                <TextField label='Username' placeholder='Enter username' fullWidth required style={margin} input value={userName} onChange={(event) => handleOnChange(event, setUserName)}></TextField>
    
                <TextField label='Password' placeholder='Enter password' type = 'password' 
                fullWidth required input value={Passcode} onChange={(event)=> handleOnChange(event,setPassword)}></TextField>
                
                <FormControl>
                    <RadioGroup defaultValue="user" value={loginType} onChange={(event)=> handleOnChange(event,setType)}>
                        <FormControlLabel value="user" control={<Radio />} label="Login as User" />
                         <FormControlLabel value="seller" control={<Radio />} label="Login as Seller" />
                    </RadioGroup>
                </FormControl>

                <Grid align='center'>
                    <Link to = "/" style={{color:"black" , textDecoration: 'none'}}>
                      <Button onClick={handleLogin} type='submit' color='primary' variant="contained" 
                      style= {buttonStyle} fullWidth required disableElevation>Login</Button>
                    </Link>
                </Grid>
                <Typography >Don't Have an Account ? </Typography>

                <Link to ="/register">Sign Up</Link>

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
            <Box sx={{mt:"350px"}}>
            <Divider>
            <Typography>
                 © Smart Sneaker Head, 2022. All Rights Reserved.
            </Typography>
            </Divider>
            </Box>    

            </Grid>
        )} else if(flag === true && loginType === "user"){
                return(
                    <Navigate to='/'/>
        )}else if(flag === true && loginType === "seller"){
                return(
                   <Navigate to='/seller'/>
           )} 
}

export default Login;