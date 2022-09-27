import { Drawer ,List , ListItem , ListItemText} from "@mui/material";
import React from "react";



const User = () =>{

    return(
     <>
        
        <Drawer 
       
          variant="persistent"
          anchor="right"
          open={true}
          
          >
            <List>
                <ListItem>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>My Profile</ListItemText>
                </ListItem><ListItem>
                    <ListItemText>details</ListItemText>
                </ListItem>
            </List>
          </Drawer>
     </>
       
    )
}




export default User;



