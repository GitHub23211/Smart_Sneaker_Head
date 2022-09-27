import { Avatar, Grid,Paper, TextField ,Button, Typography , Link} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import React from "react";



const Login=()=>{


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
            <TextField label='Username' placeholder='Enter username' fullWidth required style={margin}></TextField>
            <TextField label='Password' placeholder='Enter password' type = 'password' fullWidth required></TextField>

            <Grid align='center'>
               <Button href= "/user" type='submit' color='primary' variant="contained" style= {buttonStyle} fullWidth required disableElevation>Login</Button>
            </Grid>
            <Typography >
                Don't Have an Account ? 
                <Link href='#'>
                     Sign Up 
                </Link>
            </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;