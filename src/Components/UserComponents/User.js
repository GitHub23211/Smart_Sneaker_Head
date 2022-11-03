import { React, useContext } from "react";
import LoginContext from '../../LoginContext';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios'
import { useCookies } from 'react-cookie';


import {ListItemButton, ListItemIcon,List , ListItem , ListItemText,Grid, Paper} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';


const User = () =>{

  const paperStyle = {height:'100vh'}
  const outletStyle = {margin:'10px' ,padding:"10px", height:'auto', alignItems:"center",justifyContent:"center", overflow:"auto"}
  const {setLogin,setLoginType} = useContext(LoginContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login_type']);


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
    
      <Link style={{color:"black" , textDecoration: 'none'}}  to = "/user/profile">
        <List>
          <ListItem disablePadding><ListItemButton >
            <ListItemIcon>< AccountBoxIcon/></ListItemIcon>
              <ListItemText primary="PROFILE" />
            </ListItemButton>
            </ListItem>
        </List>
        </Link> 

        <Link style={{color:"black" , textDecoration: 'none'}} to = "/user/updateprofile">
        <List>
          <ListItem disablePadding>
            <ListItemButton > 
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary="UPDATE PROFILE" />
            </ListItemButton>
          </ListItem>
        </List>
        </Link> 

        <Link style={{color:"black" , textDecoration: 'none'}} to = "/user/orders">
        <List>
          <ListItem disablePadding>
            <ListItemButton> 
              <ListItemIcon>< ShoppingBasketIcon /></ListItemIcon>
              <ListItemText primary="ORDERS" />
            </ListItemButton>
          </ListItem>
        </List>
        </Link>

        <Link style={{color:"black" , textDecoration: 'none'}} to = "/user/wishlist">
        <List>
          <ListItem disablePadding>
            <ListItemButton> 
            <ListItemIcon><SellIcon /></ListItemIcon>
              <ListItemText primary="WISHLIST" />
            </ListItemButton>
          </ListItem>
      </List>
      </Link>

      <Link style={{color:"black" , textDecoration: 'none'}}  to = "/">
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



