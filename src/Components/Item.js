

import { Paper, Button } from '@mui/material'


function Item({item})
{
    return (
        <Paper>
            <img src={item.image} alt={item.title} style={{height: "45vh"}} />
            <h2>{item.title}</h2>

            <Button className="CheckButton">
                Link to Product Page
            </Button>
        </Paper>
    )
}

export default Item