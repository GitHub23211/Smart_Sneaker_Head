import React from "react";
import { Avatar, Grid , Paper, TextField , Button , Typography ,FormGroup,FormControlLabel,Checkbox} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Register= ()=>{


    
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
            <TextField label='Username' placeholder='Enter username' fullWidth required style={margin}></TextField>
            <TextField label='Email' placeholder='Enter email' fullWidth required style={margin}></TextField>
            <TextField label='Password' placeholder='Enter password' type = 'password' fullWidth required style={margin}></TextField>
            <TextField label='Confirm Password' placeholder='Enter password again' type = 'password' fullWidth required style={margin}></TextField>
             
            {/* <p>Please enter the ABN to sell products.</p>
            <TextField label='ABN' placeholder='Enter ABN' fullWidth  style={margin}></TextField>
            <TextField label='Address' placeholder='Enter Address'fullWidth style={margin}></TextField> */}

            <FormGroup>
                 <FormControlLabel control={<Checkbox defaultUnChecked />} label="I accept the terms and conditions." />
            </FormGroup>

            <Grid align='center'>
               <Button type='submit' color='primary' variant="contained" style= {buttonStyle} fullWidth required disableElevation>Sign Up</Button>
            </Grid>
            </Paper>
        </Grid>
    )
}



export default Register;