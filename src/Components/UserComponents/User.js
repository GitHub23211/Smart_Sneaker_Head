import { React, useContext } from "react";
import LoginContext from '../../LoginContext';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios'
import { useCookies } from 'react-cookie';

import {ListItemButton, ListItemIcon,List , ListItem , ListItemText,Grid, Paper} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const User = () =>{

  const paperStyle = {height:'100vh'}
  const outletStyle = {margin:'10px' ,padding:"10px", height:'auto', alignItems:"center",justifyContent:"center", overflow:"auto"}
  const {setLogin,setLoginType} = useContext(LoginContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login_type']);

  const linkstyle = {
    color:"black" , 
    textDecoration: 'none'
  }


  const handleLogout = () => {
    setLogin(false)
    setLoginType("")
    setCookie('LoginType', undefined, { path: '/' });
    removeCookie('LoginType',{ path: '/' })
    axios.get('/auth/logout')
  }
  
    return( 
    <> 

    <Grid container>
    <Grid item  sm={3}>
    <Paper style={paperStyle}>
    <nav className="side-nav">
    
      <Link style={linkstyle}  to = "/user/profile">
        <List>
          <ListItem disablePadding><ListItemButton >
            <ListItemIcon>< AccountBoxIcon/></ListItemIcon>
              <ListItemText primary="PROFILE" />
            </ListItemButton>
            </ListItem>
        </List>
        </Link> 

        <Link style={linkstyle} to = "/user/updateprofile">
        <List>
          <ListItem disablePadding>
            <ListItemButton > 
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary="UPDATE PROFILE" />
            </ListItemButton>
          </ListItem>
        </List>
        </Link> 

        <Link style={linkstyle} to = "/user/orders">
        <List>
          <ListItem disablePadding>
            <ListItemButton> 
              <ListItemIcon>< ShoppingBasketIcon /></ListItemIcon>
              <ListItemText primary="ORDERS" />
            </ListItemButton>
          </ListItem>
        </List>
        </Link>

        <Link style={linkstyle} to = "/user/wishlist">
        <List>
          <ListItem disablePadding>
            <ListItemButton> 
            <ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
              <ListItemText primary="WISHLIST" />
            </ListItemButton>
          </ListItem>
      </List>
      </Link>

      <Link style={linkstyle}  to = "/">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} > 
              <ListItemIcon>< LogoutIcon/></ListItemIcon>
              <ListItemText primary="LOGOUT" />
            </ListItemButton>
          </ListItem>
         </List>
      </Link>

      </nav> 
    </Paper>
    </Grid>
    <Grid item xs={0} sm={1} />
    <Grid item xs={12} sm={7} align='center'>
         <Paper style={outletStyle}>
         <Outlet />
         </Paper>
            
       
    </Grid>
  </Grid>
  </>
    )
}

export default User;



