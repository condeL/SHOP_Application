import {Alert, Box, Button, Grid, Paper, Snackbar, TextField, Typography} from "@mui/material";
import Navbar from "../components/Navbar";
import {useState} from "react";

const Register = () =>{

    const handleRegister = (e)=>{
        e.preventDefault()
        setOpenAlert(true)
    }

    const [openAlert, setOpenAlert] = useState(false);
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <>
            <Navbar/>
            <Box sx={{width:"100%",
                minHeight: "100vh",
                background: "linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)),url(https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/07/pokemon-gotta-catch-em-all-slogan.jpg?q=50&fit=contain&w=960&h=500&dpr=1.5)",
                backgroundSize: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"}}>
                <Paper sx={{width:{xs:"80%", md:"50%"}, padding:"20px", margin:"20px 0"}}>
                    <Typography textAlign="center" variant="h2" sx={{fontWeight: 500, marginBottom:"16px"}}>CREATE AN ACCOUNT</Typography>
                    <Grid container component="form" spacing={2}>
                        <Grid item xs={12} md={6} component={TextField} placeholder="Name" fullWidth />
                        <Grid item xs={12} md={6} component={TextField} placeholder="Last name" fullWidth />
                        <Grid item xs={12} md={6} component={TextField} placeholder="Username" fullWidth />
                        <Grid item xs={12} md={6} component={TextField} placeholder="Email" fullWidth />
                        <Grid item xs={12} md={6} component={TextField} placeholder="Password" fullWidth />
                        <Grid item xs={12} md={6} component={TextField} placeholder="Confirm" fullWidth />
                    </Grid>
                    <Typography sx={{margin: "20px 10px"}}>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>.</Typography>
                    <Box display="flex" justifyContent="center">
                        <Button variant="contained" type="submit" onClick={handleRegister} sx={{width:"40%", padding: "15px 20px", marginLeft:"10px"}}>CREATE</Button>
                    </Box>
                </Paper>
            </Box>
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Feature disabled in demo version.
                </Alert>
            </Snackbar>
        </>
    )
}

export default Register;