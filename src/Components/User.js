import { React, useContext } from "react";
import LoginContext from '../LoginContext';
import { Link, Outlet } from 'react-router-dom';

import {ListItemButton, ListItemIcon,List , ListItem , ListItemText,Grid, Paper} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


const User = () =>{

  const paperStyle = {height:'100vh'}
  const outletStyle = {margin:'50px' , height:'80vh', alignItems:"center",
  justifyContent:"center"}
  const {setLogin} = useContext(LoginContext);
  
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
              <ListItemText primary="My Profile" />
            </ListItemButton>
            </ListItem>
        </List>
        </Link> 

        <Link style={{color:"black" , textDecoration: 'none'}} to = "/user/updateprofile">
        <List>
          <ListItem disablePadding>
            <ListItemButton > 
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary="Update Profile" />
            </ListItemButton>
          </ListItem>
        </List>
        </Link> 

        <Link style={{color:"black" , textDecoration: 'none'}} to = "/user/orders">
        <List>
          <ListItem disablePadding>
            <ListItemButton> 
              <ListItemIcon>< ShoppingBasketIcon /></ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
        </List>
        </Link>

        <Link style={{color:"black" , textDecoration: 'none'}} to = "/user/sell">
        <List>
          <ListItem disablePadding>
            <ListItemButton> 
            <ListItemIcon><SellIcon /></ListItemIcon>
              <ListItemText primary="Sell a Product" />
            </ListItemButton>
          </ListItem>
      </List>
      </Link>

      <Link style={{color:"black" , textDecoration: 'none'}}  to = "/">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={ () => { setLogin(false)} } > 
              <ListItemIcon>< RestoreFromTrashIcon/></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
         </List>
      </Link>

      <Link style={{color:"black" , textDecoration: 'none'}}  to = "/user/delete">
        <List>
          <ListItem disablePadding>
            <ListItemButton> 
              <ListItemIcon>< RestoreFromTrashIcon/></ListItemIcon>
              <ListItemText primary="Delete my Account" />
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



