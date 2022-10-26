import React from "react";
import {Link} from 'react-router-dom';
import { useContext } from 'react';

import { AppBar, Toolbar, TextField, InputAdornment, IconButton, Box,Divider} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import LoginContext from '../LoginContext';
import ProductListContext from "../ProductListContext";

const NavBar = () =>{
   const {isLogin} = useContext(LoginContext);
   const {setQuery} = useContext(ProductListContext);

   const bg ={backgroundColor:'white',margin:'auto'};
   const navStyle = {   background: 'white'}
   const buttonStyle = {backgroundColor:"white", color: 'black' }
   const handleOnChange = (event, handler) => {
      console.log(event.target.value)
      handler(event.target.value)
      setQuery(event.target.value)      
  }

    if( isLogin === false) {
      return(
         <AppBar position="relative" style={navStyle}>
            <Toolbar>
               <Box 
                  alignItems="center"
                  justifyContent="center"
                  sx={{ pb: "10px"}}>
               <Link to ="/"><img src="./logo.png" width="370px" height="80px" alt="logo"/></Link>
               </Box>
               <Box sx={{marginLeft:"20PX", width: '30%', pb:"10px",pt:"10px"}}>
               <TextField variant="filled" fullWidth label="Search" style={bg} onChange={(event) => handleOnChange(event, setQuery)}

                        InputProps={{
                                     endAdornment: (
                                      <InputAdornment>            
                                        <IconButton>
                                        <Link to = "/productlist">
                                             <SearchIcon />
                                        </Link>
                                         </IconButton>
                                     </InputAdornment>
                                     )
                                     }}
                 />
               </Box>
               <Box sx={{marginLeft:"20PX"}}> <Link style={{color:"black" , textDecoration: 'none'}} to = "/productlist">PRODUCTS</Link></Box>
               <Box sx={{marginLeft:"auto"}}>
                   <Link to ="/login" style={{color:"black" , textDecoration: 'none',marginRight:"20px"}} >LOGIN</Link>
               </Box>
               <Box sx={{marginLeft:"10px"}}> <Link to ="/register" style={{color:"black" , textDecoration: 'none'}} >REGISTER</Link></Box>
            </Toolbar>
         </AppBar>   
      )
   } else {
      return (
         <AppBar position="relative" style={navStyle}>
            <Toolbar>
               <Box 
                     alignItems="center"
                       justifyContent="center"
                      sx={{ pb: "10px"}}>
                <Link to ="/"><img src="./logo.png" width="370px" height="80px" alt="logo"/></Link>
               </Box>
               <Box sx={{marginLeft:"20PX", width: '30%', pb:"10px",pt:"10px"}}>
               <TextField variant="filled" fullWidth label="Search" style={bg} onChange={(event) => handleOnChange(event, setQuery)}
                        InputProps={{
                                     endAdornment: (
                                      <InputAdornment>
                                       <IconButton>
                                       <Link to = "/productlist">
                                             <SearchIcon />
                                        </Link>
                                       </IconButton>
                                     </InputAdornment>
                                     )
                                     }}
                 />
               </Box>
            <Box sx={{marginLeft:"20PX"}}> <Link style={{color:"black" , textDecoration: 'none'}} to = "/productlist">PRODUCTS</Link></Box>
            <Box sx={{marginLeft:"auto"}}>
               <Link to="/user">
                   <IconButton  variant='contained' sx={{marginLeft:'auto'}} style={buttonStyle} size="large" >
                   < AccountCircleIcon sx={{ fontSize: 40 }}/>
                   </IconButton>
                </Link>
            </Box>
            <Box sx={{marginLeft:"10px"}}>                
                <Link to="/user/cart">
                  <IconButton  variant='contained'sx={{marginLeft:'10px'}} style={buttonStyle} size="large" >
                  <ShoppingCartIcon sx={{ fontSize: 40 }}/></IconButton>
               </Link>
            </Box>
         </Toolbar>
      </AppBar>   
      )
   }

}

export default NavBar;