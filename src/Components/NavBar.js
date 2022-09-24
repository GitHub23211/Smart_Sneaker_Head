import React from "react";
import { AppBar, Grid, Toolbar, Typography ,Button , TextField ,InputAdornment ,IconButton ,Box} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

/*
< Grid container>
<Grid item xs={6} md={12}>
  Hi
</Grid>
<Grid item xs={6} md={12}>
  Hi
</Grid>
</Grid>*/
const navStyle = {background:'linear-gradient(90deg, rgba(2,0,36,1) 6%, rgba(37,59,23,1) 31%, rgba(49,80,18,1) 47%, rgba(9,121,83,1) 67%, rgba(0,212,255,1) 100%)'}
const buttonStyle = {backgroundColor:"white", color: 'black' }
const margin = {margin :'20px auto'}
const NavBar = () =>{

    const bg ={backgroundColor:'white',margin:'auto'}
    return(
        <AppBar position="relative" style={navStyle}>
           <Toolbar>
              <Grid sx={{placeItems:'center'}} container>
                 <Grid item xs={1}>
                    <Typography>Logo</Typography>
                   
                 </Grid>
                 <Grid item xs={1}>
                 <Typography>Name</Typography>
                 </Grid>
                 <Grid item xs={6} >
                 <TextField variant="filled"  label="Search" style={bg}
                        InputProps={{
                                     endAdornment: (
                                      <InputAdornment>
                                        <IconButton>
                                             <SearchIcon />
                                         </IconButton>
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
}



export default NavBar;