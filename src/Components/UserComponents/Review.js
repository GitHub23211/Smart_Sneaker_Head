import {useState, useEffect} from "react"
import {Grid, TextField, Rating} from "@mui/material";
import axios from "axios"

const Review = ({review}) => {

    const [user, setUser] = useState("")

    useEffect(() => {
        axios.get("/auth/user")
             .then(response => setUser(response.data.username))
    }, [])

    return (
        <>
        <h3>{user}</h3>
        <Grid style={{maxWidth: "50%", marginLeft: "25%", marginBottom: "30px"}}>
            <Rating size="large" name="read-only" value={review.rating} readOnly />

            <TextField label='Title' fullWidth style={{margin: "30px auto"}}
            InputProps={{readOnly: true}} value={review.title}></TextField>

            <TextField label='Review' fullWidth multiline rows="10"
            InputProps={{readOnly: true}} value={review.contents}></TextField> 
        </Grid>
        </>
    )
}

export default Review