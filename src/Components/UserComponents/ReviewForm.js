import {Grid, TextField, Button} from "@mui/material";

const ReviewForm = () => {

    const handleSubmit = () => {
        console.log("review submitted")
    }

    return (
        <>
        <Grid style={{maxWidth: "50%", marginLeft: "25%", marginBottom: "30px"}}>
            <TextField label='Title' fullWidth required style={{margin: "30px auto"}}
            input></TextField>

            <TextField label='Write your review here!' fullWidth required multiline rows="10"
            input></TextField> 

            <Button onClick={handleSubmit} type='submit' style={{margin: "30px auto"}}
            fullWidth required disableElevation>Submit Review</Button>

        </Grid>
        </>
    )
}

export default ReviewForm