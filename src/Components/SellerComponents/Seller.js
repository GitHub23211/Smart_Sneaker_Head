import { React, useContext } from "react";
import LoginContext from '../../LoginContext';
import { Link, Outlet } from 'react-router-dom';

import {ListItemButton, ListItemIcon,List , ListItem , ListItemText,Grid, Paper} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';


const Seller = () =>{

  const paperStyle = {height:'100vh'}
  const outletStyle = {margin:'20px' ,padding:"30px", height:'auto', alignItems:"center",justifyContent:"center"}

  const {setLogin} = useContext(LoginContext);
  
    return( 
    <> 

    <Grid container>
    <Grid item  sm={3}>
    <Paper style={paperStyle}>
    <nav className="side-nav">
    
      <Link style={{color:"black" , textDecoration: 'none'}}  to = "/seller/profile">
        <List>
          <ListItem disablePadding><ListItemButton >
            <ListItemIcon>< AccountBoxIcon/></ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
            </ListItem>
        </List>
        </Link> 

        <Link style={{color:"black" , textDecoration: 'none'}} to = "/seller/products">
        <List>
          <ListItem disablePadding>
            <ListItemButton> 
              <ListItemIcon>< ShoppingBasketIcon /></ListItemIcon>
              <ListItemText primary="My Products" />
            </ListItemButton>
          </ListItem>
        </List>
        </Link>

        <Link style={{color:"black" , textDecoration: 'none'}} to = "/seller/sellproduct">
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
              <ListItemIcon>< LogoutIcon/></ListItemIcon>
              <ListItemText primary="Logout" />
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

export default Seller;



