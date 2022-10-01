import React from "react";
import { Drawer ,MenuItem } from "@mui/material";

const Product =()=>{

    return(
        
    <Drawer open style={{ style: { margin: '25px',padding :'max-height',height: "auto" } }}>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
    </Drawer>

    )
}

export default Product;