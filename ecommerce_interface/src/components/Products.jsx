import Product from "./Product";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {Box, Grid, Pagination} from "@mui/material";
import {publicRequest} from "../requestMethods";


const Products = ({query, news, category, filters, sort, rows}) => {

    const [products,setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    let nbItems = rows? rows*3: 3;
    useEffect( ()=>{
        const getProducts = async ()=>{
            try{
                let res;
                if(category){
                    news?
                        await publicRequest.get(`/product/related`,{params: {categories:category}}).then(r=>res=r).catch(err=>console.log(err))
                        :
                        await publicRequest.get(`/product/category/${category}`).then(r=>res=r).catch(err=>console.log(err))
                } else if(query){
                    await publicRequest.get(`/product`, {params: {q:query}}).then(r=>res=r).catch(err=>console.log(err));
                }
                else if(news){
                    await publicRequest.get("/product",{params: {new:news}}).then(r=>res=r).catch(err=>console.log(err));
                } else{
                    await publicRequest.get("/product").then(r=>res=r).catch(err=>console.log(err));
                }
                setProducts(res.data)
            }catch (err){
            }
        };
        getProducts()
    }, [category, query, news]);

    useEffect(()=>{
            if(filters){
                setFilteredProducts(
                    products.filter((item) =>
                        Object.entries(filters).every(([key, value]) =>
                            item[key].includes(value)
                        )
                    )
                )
            }
        },[filters, category, products]
    );

    useEffect(()=>{
        if(sort==="new"){
            filters?
                setFilteredProducts((prevState) =>
                    [...prevState].sort((a,b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                )
                :
                setProducts((prevState) =>
                    [...prevState].sort((a,b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                )
        } else if(sort==="old"){
            filters?
                setFilteredProducts((prevState) =>
                    [...prevState].sort((a,b) =>
                        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                )
                :
                setProducts((prevState) =>
                    [...prevState].sort((a,b) =>
                        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                )
        } else if(sort === "asc"){
            filters?
                setFilteredProducts((prevState) =>
                    [...prevState].sort((a,b) =>
                        a.price - b.price)
                )
                :
                setProducts((prevState) =>
                    [...prevState].sort((a,b) =>
                        a.price - b.price)
                )
        } else if(sort === "desc"){
            filters?
                setFilteredProducts((prevState) =>
                    [...prevState].sort((a,b) =>
                        b.price - a.price)
                )
                :
                setProducts((prevState) =>
                    [...prevState].sort((a,b) =>
                        b.price - a.price)
                )
        }

    },[sort, category, filters])

    useLayoutEffect(() => {
        if(rows>1) {
            document.documentElement.scrollTo(0, 0);
        }
    }, [page, rows]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{marginLeft:"10vw", marginRight:"10vw"}}>
            <Grid container spacing={2}>
                {filters?
                    filteredProducts.slice((page-1)*nbItems,(page*nbItems)).map((item) => (
                        <Product item={item} key={item._id}/>
                    )) :
                    products.slice((page-1)*nbItems,(page*nbItems)).map((item) => (
                        <Product item={item} key={item._id}/>
                    ))
                }
            </Grid>
            {rows &&
            <Pagination count={filters? Math.ceil(filteredProducts.length/nbItems) : Math.ceil(products.length/nbItems)}
                        color="primary" onChange={handlePageChange} sx={{marginTop:"16px", display:"flex", justifyContent:"center"}}/>
            }
        </Box>
    )
}

export default Products