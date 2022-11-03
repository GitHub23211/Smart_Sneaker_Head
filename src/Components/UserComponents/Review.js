import {useState, useEffect} from "react"
import {Grid, TextField, Rating,Typography, Divider} from "@mui/material";
import axios from "axios"

const Review = ({review}) => {

    const [user, setUser] = useState("")

    useEffect(() => {
        axios.get(`/api/user/${review.reviewerid}`)
             .then(response => setUser(response.data.user))
             .catch(error => console.log(error))
    }, [])

    return (
        <>
       
        <Grid style={{maxWidth: "50%", marginLeft: "25%", marginBottom: "30px" }}>
            <h4>Reviews</h4>
           <section >
            <h4> <Rating size="medium" name="read-only" value={review.rating} readOnly/> By : {user}</h4>
           </section>
            <Typography>{review.title} : {review.contents} </Typography>
            <Divider />
        </Grid>
        </>
    )
}

export default Review