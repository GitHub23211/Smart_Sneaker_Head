import {useState} from "react"
import axios from "axios";

import {Grid, TextField, Button, Rating} from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";

const ReviewForm = ({product, setPosted, posted}) => {

    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [rating, setRating] = useState(0)

    const[open,setOpen] = useState(false)
    const [msgTitle, setMessageTitle] = useState("") 
    const [msgContent , setMessageContent] = useState("") 
  

    const handleOnChange = (event, handler) => {
        handler(event.target.value)
    }

    const sanitiseReview = () => {
        if(title && contents && rating) {
            sendReview()
        }
        else {
            setMessageTitle("Error")
            setMessageContent("Please fully complete the review form including the rating!")
            setOpen(true)
        }
    }

    const sendReview = () => {
        const review = {
            title: title,
            contents: contents,
            rating: rating,
            productid: product.id
        }

        axios.put(`/api/review/add/${product.id}`, review)
             .then(response => setPosted(!posted))
             .catch(error => {
                console.log(error)
                setMessageTitle("Error")
                setMessageContent("You already have a review for this product!")
                setOpen(true)
             })
    }

    const handleRating = (event) => {
        setRating(parseInt(event.target.value))
    }


    return (
        <>
        <h1>Write Your Review Here!</h1>
        <Grid style={{maxWidth: "50%", marginLeft: "25%", marginBottom: "30px", marginTop: "15px"}}>

            <Rating size="large" name="read-only" value={rating} onChange={handleRating} />

            <TextField label='Title' fullWidth required input value={title} onChange={(e) => handleOnChange(e, setTitle)} style={{marginBottom: "30px"}} />

            <TextField label='Write your review here!' fullWidth required multiline rows="10" input onChange={(e) => handleOnChange(e, setContents)} value={contents}/> 

            <Button onClick={sanitiseReview} type='submit' style={{margin: "30px auto"}}
            fullWidth required disableElevation>Submit Review</Button>

        </Grid>

        <Dialog open={open}>
            <DialogTitle>{msgTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{msgContent}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpen(false)}>Okay</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default ReviewForm