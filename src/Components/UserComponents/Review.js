import {Grid, TextField} from "@mui/material";

const Review = () => {
    return (
        <>
        <Grid style={{maxWidth: "50%", marginLeft: "25%", marginBottom: "30px"}}>
            <TextField label='Title' placeholder='Title' fullWidth required style={{margin: "30px auto"}}
            input></TextField>

            <TextField label='Write your review here!' placeholder='Write your review here!' fullWidth required multiline rows="10"
            input></TextField> 
        </Grid>
        </>
    )
}

export default Review