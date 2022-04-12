import Navbar from "../components/Navbar";
import {Typography} from "@mui/material";

const NotFound = () =>{
    return(
        <>
            <Navbar/>
            <Typography variant="h1" sx={{margin:"10px"}}>Page not found</Typography>
        </>
    )
}

export default NotFound