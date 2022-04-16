import Navbar from "../components/Navbar";
import React, {useEffect, useState} from "react";
import Footer from "../components/Footer";
import {Add, Remove} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {publicRequest} from "../requestMethods";
import {addProduct} from "../redux/cartRedux";
import {useDispatch} from "react-redux";
import {Alert, Box, Button, Snackbar, Typography} from "@mui/material";
import Products from "../components/Products";


const Product = () =>{
    const params = useParams()
    const id = params.id;
    const[product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const[size, setSize] = useState("");
    const[color, setColor] = useState("");
    const [openAlert, setOpenAlert] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
            const getProduct = async ()=>{
                try{
                    let res;
                    await publicRequest.get("/product/"+id).then(r=>res=r).catch(err=>console.log(err))
                    setProduct(res.data);
                    setColor(res.data.color[0])
                    setSize(res.data.size[0])
                } catch (err){
                    console.log(err)
                }
            };
            getProduct();
        },[id]
    )

    const handleQuantity = (type) =>{
        if(type === "increase"){
            setQuantity(quantity+1)
        }else if(type ==="decrease"&&quantity>1){
            setQuantity(quantity-1)
        }
    }

    const handleAddCart = ()=>{
        dispatch(addProduct({...product, quantity, color, size}));
        setOpenAlert(true);
    }


    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return(
        <Box>
            <Navbar/>
            <Box display="flex" sx={{padding:"50px", flexDirection:{sm:"row",xs:"column"}}}>
                <Box sx={{flex:1, marginBottom:"5px"}}>
                    <Box display="flex" justifyContent="center">
                        <Box component="img" src={product.img} sx={{width:"100%"}} />
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection:"column", flex:1, padding:"0px 50px", alignItems:{xs:"center", sm:"flex-start"}}}>
                    <Typography variant="h2" textAlign="center" sx={{fontWeight:500}}>{product.title}</Typography>
                    <Typography variant="h4" textAlign="center" sx={{padding:"20px 0px"}}>{product.desc}</Typography>
                    <Typography variant="h3" textAlign="center">{product.price}$</Typography>
                    <Box sx={{
                        margin:"30px 0px",
                        display: "flex",
                        justifyContent: "space-between"}}>
                        <Box sx={{display:"flex", alignItems:"center", marginRight:"8px"}}>
                            <Typography variant="h4" sx={{fontWeight:400}}>Color</Typography>
                            {product.color?.map((c) =>(
                                <Box sx={{width:color===c? "25px" : "20px",
                                    height: color===c? "25px" : "20px",
                                    borderStyle:color===c? "solid" : "none",
                                    borderRadius: "50%",
                                    borderWidth:"2px",
                                    borderColor:color===c? "yellow" : "none",
                                    backgroundColor: c,
                                    margin: "0px 5px",
                                    cursor: "pointer"}} key={c} onClick={()=> setColor(c)}/>
                            ))}
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <Typography variant="h4" sx={{fontWeight:400}}>Size</Typography>
                            <select style={{marginLeft:"10px", padding:"5px"}} onChange={(e)=>setSize(e.target.value)}>
                                {product.size?.map((s) =>(
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"}}>
                        <Box sx={{display: "flex",
                            alignItems: "center",
                            fontWeight: 700}}>
                            <Remove onClick={ () => handleQuantity("decrease")}/>
                            <Typography variant="h4" sx={{ width: "30px",
                                height: "30px",
                                borderRadius: "10px",
                                border: "1px solid",
                                borderColor:"primary.main",
                                fontWeight:500,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "5px"}}>
                                {quantity}
                            </Typography>
                            <Add onClick={ () => handleQuantity("increase")}/>
                        </Box>
                        <Button variant="contained" disabled={!product._id} sx={{padding:"10px 25px", marginLeft:"10px"}} onClick = {handleAddCart}>ADD TO CART</Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{marginBottom:"16px"}}>
                <Typography textAlign="center" variant="h2" sx={{fontWeight:500,marginBottom:"8px"}}>Related Products</Typography>
                <Products rows={1} news={true} category={product.categories? product.categories.slice(1,product.categories.length): "plushie"}/>
            </Box>
            <Footer/>
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Item added to cart.
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Product