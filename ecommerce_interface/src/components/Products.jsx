import Product from "./Product";
import {useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import {publicRequest} from "../requestMethods";


const Products = ({query, news, category, filters, sort}) => {

    const [products,setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect( ()=>{
        const getProducts = async ()=>{
            try{
                let res;
                if(category){
                    news?
                        await publicRequest.get(`/product/category/${category}/?new=true`).then(r=>res=r).catch(err=>console.log(err))
                        :
                        await publicRequest.get(`/product/category/${category}`).then(r=>res=r).catch(err=>console.log(err))
                } else if(query){
                    await publicRequest.get(`/product/`, {params: {q:query}}).then(r=>res=r).catch(err=>console.log(err));
                }
                else{
                    await publicRequest.get("/product?new=true").then(r=>res=r).catch(err=>console.log(err));
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

    return (
        <Box sx={{marginLeft:"10vw", marginRight:"10vw"}}>
            <Grid container spacing={2}>
                {filters?
                    filteredProducts.map((item) => (
                        <Product item={item} key={item._id}/>
                    )) :
                    products.map((item) => (
                        <Product item={item} key={item._id}/>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default Products