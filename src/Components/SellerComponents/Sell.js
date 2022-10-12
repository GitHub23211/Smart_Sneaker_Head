import React, { useState } from "react";
import { Paper,Button,TextField } from "@mui/material";


const Sell = ()=>{

    const [prodTitle , setTitle] = useState("")
    const handleOnChange = (event, handler) => {
        console.log(event.target.value)
        handler(event.target.value)
    }
    const margin={margin:'30px auto'}
    return(
     <Paper>
        <TextField label='Product-Title' placeholder='Product Title' fullWidth style={margin} 
        input value={prodTitle} onChange={(event) => handleOnChange(event, setTitle)}></TextField> 
 
        <TextField label='Product-Description' placeholder='Product Description' fullWidth style={margin} 
        input value={prodTitle} onChange={(event) => handleOnChange(event, setTitle)}></TextField> 
 
        <TextField label='Product-Price' placeholder='Product Price' fullWidth style={margin} 
        input value={prodTitle} onChange={(event) => handleOnChange(event, setTitle)}></TextField> 

        <Button>Sell This Item</Button>
     </Paper>

    )
}

export default Sell;