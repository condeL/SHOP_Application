import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {useParams, useSearchParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";


const ProductList = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    const params = useParams()
    const category = params.category;
    const [filters, setFilters] = useState();
    const [sort, setSort] = useState("");

    const handleFilters = (event) => {
        let value = event.target.value;
        value==="Color"? setFilters(undefined):
            setFilters({
                ...filters,
                [event.target.name] : value.toLowerCase(),
            })
    };



    return (
        <Box>
            <Navbar/>
            <Typography variant="h2" sx={{fontWeight:500, margin: "20px"}}>{category? category.toUpperCase() : q? q.toUpperCase() : "ALL PRODUCTS"}</Typography>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Box sx={{margin: "20px"}}>
                    <Typography variant="h3" display="inline" sx={{fontWeight:500, marginRight: "20px"}}>Filter Products</Typography>
                    <select style={{
                        padding: "10px", marginRight: "20px"}} name="color" onChange={(handleFilters)}>
                        <option>Color</option>
                        <option>Green</option>
                        <option>Red</option>
                        <option>Blue</option>
                        <option>Yellow</option>
                        <option>Black</option>
                        <option>Pink</option>
                    </select>
                </Box>
                <Box sx={{margin: "20px"}}>
                    <Typography variant="h3" display="inline" sx={{fontWeight:500, marginRight: "20px"}}>Sort Products</Typography>
                    <select style={{padding: "10px", marginRight: "20px"}} onChange={e=>setSort(e.target.value)}>
                        <option value="old" >Oldest</option>
                        <option value="new" >Newest</option>
                        <option value="asc">Price (asc)</option>
                        <option value="desc">Price (desc)</option>
                    </select>
                </Box>
            </Box>
            <Products query={q} category={category} filters={filters} sort={sort} rows={3}/>
            <Newsletter/>
            <Footer/>
        </Box>
    )
}

export default ProductList