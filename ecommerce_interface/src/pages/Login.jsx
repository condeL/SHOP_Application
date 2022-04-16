import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/apiCalls";
import {Alert, Box, Button, Grid, Paper, Snackbar, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";


const Login = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const handleLogin = (e)=>{
        e.preventDefault()
        //login(dispatch,{username, password})
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
                    <Typography variant="h2" textAlign="center" sx={{fontWeight: 500, marginBottom:"16px"}}>SIGN IN</Typography>
                    <Grid container component="form" spacing={2}>
                        <Grid item xs={12} md={6} component={TextField} placeholder="Username" fullWidth
                              onChange={(e)=>setUsername(e.target.value)}/>
                        <Grid item xs={12} md={6} component={TextField} placeholder="Password" type="password" fullWidth
                              onChange={(e)=>setPassword(e.target.value)}/>
                    </Grid>
                    <Box display="flex" justifyContent="center">
                        <Button variant="contained" onClick={handleLogin} sx={{width:"40%", padding: "15px 20px",margin: "16px"}}>LOG IN</Button>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Link to={"/"} style={{marginRight: "8px"}}>Forgot your password?</Link>
                        <Link to={"/register"}>Create new account.</Link>
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

export default Login;