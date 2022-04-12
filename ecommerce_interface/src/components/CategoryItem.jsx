
import {Link} from "react-router-dom";
import {Box, Button, Grid, Typography} from "@mui/material";


const CategoryItem = ({item}) => {
    return(
        <Grid item xs={12} md sx={{position:"relative"}}>
            <Link to={`/products/category/${item.cat}`} style={{ textDecoration: 'none', color:"inherit" }}>
            <Box component="img" src = {item.img} sx={{width:"100%", height: "100%", filter: "brightness(80%)"}}/>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "absolute", top:0, left:0, width: "100%", height: "100%"}}>
                <Typography variant="h2" sx={{marginBottom:"15px", fontWeight: 600, color: "white"}}>{item.title}</Typography>
                <Button variant="contained" sx={{fontWeight: 600, backgroundColor: "lightgray", color: "black" ,":hover":{backgroundColor:"darkgray", color: "white"}}}>SHOP NOW</Button>
            </Box>
            </Link>
        </Grid>
    )
}

export default CategoryItem