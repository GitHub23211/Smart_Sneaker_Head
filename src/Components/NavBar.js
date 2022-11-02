import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useContext } from 'react';

import { AppBar, Toolbar, TextField, InputAdornment, IconButton, Box, Menu, MenuItem} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import LoginContext from '../LoginContext';
import ProductListContext from "../ProductListContext";
import { BorderBottomRounded } from "@mui/icons-material";

const NavBar = () =>{
   const {isLogin,loginType} = useContext(LoginContext);
   const {setQuery} = useContext(ProductListContext);

   const bg ={backgroundColor:'white',margin:'auto'};
   const navStyle = {   background: 'white'}
   const buttonStyle = {backgroundColor:"white", color: 'black' }

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };

   const handleOnChange = (event, handler) => {
      handler({"name": event.target.value})
  }
 const handleCategory =(event,brand) =>{
     setQuery({"brand": brand})
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
               <Box sx={{marginLeft:"20PX"}}> <Link onClick = {(event) => handleCategory(event, "")} style={{color:"black" , textDecoration: 'none'}} to = "/productlist">SNEAKERS</Link></Box>

               <Box sx={{marginLeft:"20PX"}}> 
               <Link  style={{color:"black" , textDecoration: 'none',mt:"10px"}}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                    >
                   BRANDS
                  </Link>
                  </Box>

               <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                  'aria-labelledby': 'basic-button',
               }}
               >
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Nike")}>Nike</MenuItem></Link>
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Adidas")}>Adidas</MenuItem></Link>
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Reebok")}>Reebok</MenuItem></Link>
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Jordans")}>Jordans</MenuItem></Link>
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Asics")}>Asics</MenuItem></Link>

               </Menu>
               <Box sx={{marginLeft:"550px", width: '30%', pb:"10px",pt:"10px"}}>
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
               



               <Box sx={{marginLeft:"auto"}}>
                   <Link to ="/login" style={{color:"black" , marginLeft:"20px", textDecoration: 'none',marginRight:"20px"}} >LOGIN</Link>
               </Box>
               <Box sx={{marginLeft:"10px"}}> <Link to ="/register" style={{color:"black" , textDecoration: 'none'}} >REGISTER</Link></Box>
            </Toolbar>
         </AppBar>   
      )
   } else if( isLogin === true && loginType==="user") {
      return (
         <AppBar position="relative" style={navStyle}>
            <Toolbar>
               <Box 
                  alignItems="center"
                  justifyContent="center"
                  sx={{ pb: "10px"}}>
               <Link to ="/"><img src="./logo.png" width="370px" height="80px" alt="logo"/></Link>
               </Box>
               <Box sx={{marginLeft:"20PX"}}> <Link onClick = {(event) => handleCategory(event, "")} style={{color:"black" , textDecoration: 'none'}} to = "/productlist">SNEAKERS</Link></Box>

               <Box sx={{marginLeft:"20PX"}}> 
               <Link  style={{color:"black" , textDecoration: 'none',mt:"10px"}}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                    >
                   BRANDS
                  </Link>
                  </Box>

               <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                  'aria-labelledby': 'basic-button',
               }}
               >
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Nike")}>Nike</MenuItem></Link>
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Adidas")}>Adidas</MenuItem></Link>
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Reebok")}>Reebok</MenuItem></Link>
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Jordans")}>Jordans</MenuItem></Link>
                <Link to = "/productlist"  style={{color:"black" , textDecoration: 'none',mt:"10px"}}><MenuItem onClick = {(event) => handleCategory(event, "Asics")}>Asics</MenuItem></Link>

               </Menu>
               <Box sx={{marginLeft:"550px", width: '30%', pb:"10px",pt:"10px"}}>
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
   }else if(isLogin === true && loginType==="seller"){
      return (
         <AppBar position="relative" style={navStyle}>
            <Toolbar>
               <Box 
                     alignItems="center"
                       justifyContent="center"
                      sx={{ pb: "10px"}}>
                <img src="./logo.png" width="370px" height="80px" alt="logo"/>
               </Box>             
         </Toolbar>
      </AppBar>   
      )
   }


}

export default NavBar;