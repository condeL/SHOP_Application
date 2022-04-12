import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Add, Remove} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Box, Button, Divider, Snackbar, Typography} from "@mui/material";
import {useState} from "react";
import {changeQuantity, checkout} from "../redux/cartRedux";
import {Link} from "react-router-dom";


const Cart = () =>{
    const cart = useSelector((state)=>state.cart);
    const dispatch = useDispatch();

    const [openAlert, setOpenAlert] = useState(false);
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleCheckout= ()=>{
        dispatch(checkout());
        setOpenAlert(true);
    }

    const handleQuantity = (index, quantity)=>{
        dispatch(changeQuantity({index, quantity}));
    }

    return (
        <Box>
            <Navbar/>
            <Box sx={{padding:"20px"}}>
                <Typography variant="h2" sx={{fontWeight:500, textAlign:"center"}}>CART</Typography>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px"}}>
                    <Button component={Link} to={"/products/"} variant="outlined" sx={{padding:"10px", fontWeight:600,color:"primary.main", backgroundColor:"rgba(20, 93, 235, 0.1)",":hover":{
                            color:"primary.dark",
                            backgroundColor:"rgba(20, 93, 235, 0.1)"
                        }
                    }}>CONTINUE SHOPPING</Button>
                    <Button variant="contained" disabled={cart.total<=0} onClick={handleCheckout} color="secondary" sx={{padding:"10px", fontWeight:600}}>CHECKOUT NOW</Button>
                </Box>
                <Box display="flex" justifyContent="space-between" sx={{flexDirection:{
                        xs:"column",
                        md:"row"
                    }}}>
                    <Box flex={3}>
                        {cart.products.map((product, index)=>(
                                <Box key={index} sx={{padding: "4px"}}>
                                    <Divider variant="middle"/>
                                    <Box sx={{display:"flex", justifyContent:"space-between", padding:"8px",flexDirection:{
                                            xs:"column-reverse",
                                            md:"row"}}}>
                                        <Box flex={2} display="flex" sx={{flexDirection:{
                                                xs:"column",
                                                md:"row"}}}>
                                            <Box display="flex" component={Link} to={`/product/${product._id}`} justifyContent="center">
                                                <Box component="img" sx={{width:"200px"}} src={product.img}/>
                                            </Box>
                                            <Box sx={{display:"flex", flexDirection:"column", alignItems:{xs:"center",md:"start"}, justifyContent:"space-around", padding:"20px"}}>
                                                <Typography><b>Item:</b> {product.title}</Typography>
                                                <Typography><b>ID:</b> {product._id}</Typography>
                                                <Box sx={{width:"20px", height:"20px", borderRadius: "50%",backgroundColor:product.color}}/>
                                                <Typography><b>Size:</b> {product.size}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" , flex:1}}>
                                            <Box sx={{display:"flex", alignItems:"center", marginBottom:"5px"}}>
                                                <Remove onClick={() => handleQuantity(index, -1)}/>
                                                <Typography variant="h4" sx={{margin:"5px", fontWeight:500}}>{product.quantity}</Typography>
                                                <Add onClick={() => handleQuantity(index, 1)}/>
                                            </Box>
                                            <Typography variant="h4" sx={{marginBottom:"10px",fontWeight:500}}>{product.price*product.quantity}$</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        )}
                    </Box>
                    <Box sx={{flex: 1,
                        border: "0.5px solid",
                        borderColor: "primary.main",
                        borderRadius: "10px",
                        marginTop:"16px",
                        padding: "10px",
                        height: "50vh"}}>
                        <Typography variant="h3" sx={{fontWeight:500}}>ORDER SUMMARY</Typography>
                        <Box sx={{margin: "10px 0", display: "flex", justifyContent: "space-between"}}>
                            <Typography>Subtotal: </Typography>
                            <Typography>{cart.total}$</Typography>
                        </Box>
                        <Box sx={{margin: "10px 0", display: "flex", justifyContent: "space-between"}}>
                            <Typography>Estimated Shipping: </Typography>
                            <Typography>5.60$</Typography>
                        </Box>
                        <Box sx={{margin: "10px 0", display: "flex", justifyContent: "space-between"}}>
                            <Typography>Shipping discount: </Typography>
                            <Typography>-5.60$</Typography>
                        </Box>
                        <Box sx={{margin: "10px 0", display: "flex", justifyContent: "space-between", fontWeight: 500, fontSize: "20px"}}>
                            <Typography>Total: </Typography>
                            <Typography>{cart.total}$</Typography>
                        </Box>
                        <Button variant="contained" disabled={cart.total<=0} onClick={handleCheckout} sx={{width:"100%", padding: "10px 15px", margin: "10px 0", fontWeight:600 }} >Checkout</Button>
                    </Box>
                </Box>
            </Box>
            <Footer/>
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Thank you for your purchase!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Cart;