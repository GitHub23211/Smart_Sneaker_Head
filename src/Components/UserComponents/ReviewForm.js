import {useState, useEffect} from "react"
import {Grid, TextField, Button, Rating} from "@mui/material";
import axios from "axios";

const ReviewForm = ({product}) => {

    const [user, setUser] = useState({})
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [rating, setRating] = useState(0)

    const handleOnChange = (event, handler) => {
        handler(event.target.value)
    }

    const handleSubmit = () => {
        const review = {
            title: title,
            contents: contents,
            rating: rating,
            productid: product.id,
            reviewerid: user.id
        }
        console.log("review submitted", review)
    }

    const handleRating = (event) => {
        setRating(parseInt(event.target.value))
    }

    const sendReview = () => {
        // const review = {
        //     title: title,
        //     contents: contents,
        //     rating: rating,
        //     productid: ,
        //     reviewerid:
        // }
    }

    useEffect(() => {
        axios.get("/auth/user").then(response => setUser(response.data))
    }, [])

    return (
        <>
        <h1>Write Your Review Here!</h1>
        <Grid style={{maxWidth: "50%", marginLeft: "25%", marginBottom: "30px", marginTop: "15px"}}>

            <Rating size="large" name="read-only" value={rating} onChange={handleRating} />

            <TextField label='Title' fullWidth required input value={title} onChange={(e) => handleOnChange(e, setTitle)} style={{marginBottom: "30px"}} />

            <TextField label='Write your review here!' fullWidth required multiline rows="10" input onChange={(e) => handleOnChange(e, setContents)} value={contents}/> 

            <Button onClick={handleSubmit} type='submit' style={{margin: "30px auto"}}
            fullWidth required disableElevation>Submit Review</Button>

        </Grid>
        </>
    )
}

export default ReviewForm