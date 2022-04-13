import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {sliderItems} from "../data";
import {useState} from "react";
import { styled } from '@mui/system';
import {Box, Button, Typography} from "@mui/material";
import sx from "@mui/system/sx";
import {Link} from "react-router-dom";


const Arrow = styled(Box)((props)=>({
    width:"50px",
    height: "50px",
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto",
    left: props.direction ==="left" && "10px",
    right: props.direction ==="right" && "10px",
    cursor: "pointer",
    opacity: 0.5,
    zIndex: 2
}));

const Wrapper = styled(Box)((props)=>(sx({
    height: "100%",
    display: "flex",
    transition: "all 1.5s ease",
    transform: "translate("+(props.slideIndex * -100)+"vw)"
})));



const Slider = () =>{
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) =>{
        if(direction==="left"){
            setSlideIndex(slideIndex > 0? slideIndex-1 : 2)
        } else{
            setSlideIndex(slideIndex < 2? slideIndex+1 : 0)
        }
    }

    return(
        <Box sx={{width: "100%", display: "flex", position: "relative", overflow: "hidden"}}>
            <Arrow direction="left" onClick={ () => handleClick("left")}>
                <ArrowBack/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                    <Box key={item.id} sx={{width:"100vw",
                        display: "flex",
                        flexDirection:{xs:"column", md:"row"},
                        alignItems: "center",
                        padding:"50px",
                        backgroundColor: item.bg==="red"? "lightsalmon" : "light"+item.bg}}>
                        <Box sx={{flex:1, display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <Box component="img" src={item.img} sx={{height: {xs:"250px", md:"500px"}}}/>
                        </Box>
                        <Box sx={{flex:1, display:"flex", flexDirection:"column", alignItems: {xs:"center",md:"start"}}}>
                            <Typography variant="h1" sx={{fontWeight:500,textAlign: {xs:"center", md:"start"}}}>{item.title}</Typography>
                            <Typography variant="h2" sx={{margin:"25px 0", fontWeight:500, textAlign: {xs:"center", md:"start"}}}>{item.description}</Typography>
                            <Link to={"/products/category/plushie"} style={{ textDecoration: 'none', color:"inherit" }}>
                                <Button variant="contained" sx={{backgroundColor: item.bg ,":hover":{backgroundColor:"dark"+item.bg}}}>SEE MORE</Button>
                            </Link>
                        </Box>
                    </Box>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={ () => handleClick("right")}>
                <ArrowForward/>
            </Arrow>
        </Box>
    )
}

export default Slider