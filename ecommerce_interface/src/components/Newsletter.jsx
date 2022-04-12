import {Send} from "@mui/icons-material";
import {Box, Button, TextField, Typography} from "@mui/material";


const Newsletter = () =>{
    return(
        <Box sx={{
            marginTop:"20px",
            padding:"50px 0",
            backgroundColor: "whitesmoke",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"}}>
            <Typography variant="h1" sx={{marginBottom: "20px", fontWeight:500}}>NEWSLETTER</Typography>
            <Typography variant="h2" align="center" sx={{marginBottom: "20px", fontWeight:300}}>Get the latest news!</Typography>
            <Box sx={{display:"flex", width:{xs:"75%",sm:"50%"}}}>
                <TextField placeholder={"Your email"} fullWidth/>
                <Button variant="contained" >
                    <Send/>
                </Button>
            </Box>
        </Box>
    )
}

export default Newsletter