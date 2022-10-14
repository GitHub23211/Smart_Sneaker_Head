import React from "react";
import {Link} from 'react-router-dom';
import { useContext } from 'react';

import { AppBar, Grid, Toolbar, Typography, Button, TextField, InputAdornment, IconButton, Box} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import LoginContext from '../LoginContext';

const NavBar = () =>{
   const {isLogin} = useContext(LoginContext);
   const bg ={backgroundColor:'white',margin:'auto'};
   const navStyle = {   background: 'radial-gradient(circle, rgba(237,179,100,1) 0%, rgba(233,211,190,1) 25%, rgba(182,148,97,1) 47%, rgba(158,118,89,1) 70%, rgba(191,135,4,1) 87%, rgba(222,202,156,1) 100%)'}
   const buttonStyle = {backgroundColor:"white", color: 'black' }

    console.log("NavBar", isLogin);

    if( isLogin === false) {
      return(
        <AppBar position="relative" style={navStyle}>
           <Toolbar>
              <Grid sx={{placeItems:'center'}} container>
                 <Grid item xs={2}>
                    <img src="/logo.png" alt="image" width="200px" height="100px"/>
                 </Grid>
                 <Grid item xs={6} >
                 <TextField variant="filled"  label="Search" style={bg}
                        InputProps={{
                                     endAdornment: (
                                      <InputAdornment>
                                        <Link to = "/productlist">
                                        <IconButton>
                                             <SearchIcon />
                                         </IconButton>
                                         </Link>
                                     </InputAdornment>
                                     )
                                     }}
                 />
                 </Grid>

                 <Grid xs={1} />
                 <Grid item xs={3}>
                   <Box display="flex">
                     <Button href="/login" variant='contained' sx={{marginLeft:'auto'}} style={buttonStyle}>Login</Button>
                    <Button href="/register" variant='contained'sx={{marginLeft:'10px'}} style={buttonStyle} >Sign Up</Button>
                   </Box>   
                 </Grid>
              </Grid>
           </Toolbar>
        </AppBar>
      )
   } else {
      return (
      <AppBar position="relative" style={navStyle}>
      <Toolbar>
         <Grid sx={{placeItems:'center'}} container>
            <Grid item xs={2}>
               <Typography>Logo</Typography>
               <img src="/logo.png" alt="image" width="200px" height="100px"/>
            </Grid>

            <Grid item xs={6} >
            <TextField variant="filled"  label="Search" style={bg}
                   InputProps={{
                                endAdornment: (
                                 <InputAdornment>
                                   <Link to = "/productlist">
                                   <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                    </Link>
                                </InputAdornment>
                                )
                                }}
        />
            </Grid>

            <Grid xs={1} />
            <Grid item xs={3}>
              <Box display="flex">
              <Link to="/user">
                <IconButton  variant='contained' sx={{marginLeft:'auto'}} style={buttonStyle} size="large" >
                  < AccountCircleIcon />
               </IconButton>
               </Link>
                
               <Link to="/user/cart">
                <IconButton  variant='contained'sx={{marginLeft:'10px'}} style={buttonStyle} size="large" >
               <ShoppingCartIcon /></IconButton>
               </Link>
               
              </Box>   
            </Grid>
         </Grid>
      </Toolbar>
   </AppBar>
      )
   }

}

export default NavBar;