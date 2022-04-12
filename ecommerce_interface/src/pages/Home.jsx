import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {Box, Typography} from "@mui/material";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Box sx={{
                display: "flex",
                justifyContent: "center"}}>
                <Typography variant="h1"  sx={{margin: "10px 0px", fontWeight:500}}>LATEST ARRIVALS</Typography>
            </Box>
            <Products/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home