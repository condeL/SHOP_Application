import {categories} from "../data";
import CategoryItem from "./CategoryItem";
import {Box, Grid} from "@mui/material";


const Categories = () => {
    return(
        <Box sx={{margin: "8px"}}>
        <Grid container spacing={1} alignItems="stretch" >
            {categories.map((item) =>(
                <CategoryItem item={item} key={item.id}/>
            ))}
        </Grid>
        </Box>
    )
}

export default Categories