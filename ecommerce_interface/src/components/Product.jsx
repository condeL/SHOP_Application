import {FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Alert, Box, Grid, IconButton, Paper, Snackbar, Typography} from "@mui/material";
import { styled } from '@mui/system';
import {addProduct} from "../redux/cartRedux";
import React, {useState} from "react";
import {useDispatch} from "react-redux";

const Icon = styled(IconButton)({
        backgroundColor: "white",
        margin: "10px",
        transition: "all 0.5s ease",
        color:"black",
        ":hover": {
            transform: "scale(1.1)"
        }
    }
)


const Product = ({item}) => {
    const [openAlert, setOpenAlert] = useState(false);
    const dispatch = useDispatch();

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleAddCart = ()=>{
        dispatch(addProduct({...item, quantity:1, color:item.color[0], size:item.size[0]}));
        setOpenAlert(true);
    }
    return (
        <>
            <Grid item xs={12} md={4} >
                <Paper elevation={2} sx={{
                    position:"relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection:"column",
                    backgroundColor: "rgba(20, 93, 235, 0.1)",
                    ":hover .info" : {
                        opacity: 1
                    }
                }}>
                    <Box className="info" sx={{opacity:0,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        top:0,
                        left:0,
                        zIndex: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.25s ease",
                    }}>
                        <Icon disableRipple onClick={()=>handleAddCart()} sx={{":hover":{color:"primary.main"}}}>
                            <ShoppingCartOutlined/>
                        </Icon>
                        <Icon disableRipple component={Link} to={`/product/${item._id}`} sx={{":hover":{color:"primary.main"}}}>
                            <SearchOutlined/>
                        </Icon>
                        <Icon disableRipple sx={{":hover":{color:"error.main"}}}>
                            <FavoriteBorderOutlined/>
                        </Icon>
                    </Box>
                    <Box sx={{
                        height: "250px",
                        width:"100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection:"column",
                        position: "relative"
                         }}>
                        <Box sx={{width: "240px", height: "240px", borderRadius: "50%",position: "absolute", backgroundColor: "white"}}/>
                        <Box component="img" src={item.img} sx={{height: "90%", objectFit: "cover",zIndex: 2}}/>
                    </Box>
                    <Box sx={{display:"flex", alignItems:"center", flexDirection:"column", marginTop:"4px", marginBottom:"4px"}}>
                        <Typography variant="h5" >{item.title}</Typography>
                        <Typography variant="h3">{item.price}$</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Item added to cart.
                </Alert>
            </Snackbar>
        </>
    );
}

export default Product