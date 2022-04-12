import {Search, ShoppingCartOutlined} from "@mui/icons-material";
import {
    AppBar,
    Badge,
    Box,
    Button,
    IconButton,
    InputAdornment, Menu, MenuItem,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";


const Navbar = () =>{
    const quantity = useSelector(state=>state.cart.cartQuantity);

    const [mobile, setMobile] = useState(false);


    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setMobile(true)
                : setMobile(false);
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }
    }, []);

    return (
        <AppBar position = "sticky" sx={{ bgcolor: "white", color: "black" }}>
            {mobile ? <MobileNavbar quantity={quantity}/> : <DesktopNavbar quantity={quantity}/>}
        </AppBar>
    )
}


const MobileNavbar = (props) =>{

    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState("");
    let navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Toolbar sx={{padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems:"center"}}>
            <Box sx={{flex: 1,  justifyContent: "flex-start"}}>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="translate"
                    onClick={handleClick}
                    size="large">
                    <MenuIcon sx={{color:"primary.main"}}/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onKeyDown={(e) => e.stopPropagation()}>
                        <TextField size="small" type="search" placeholder="Search product" onChange={(e)=>setSearch(e.target.value)}
                                   sx={{marginRight:"10px", marginLeft:"10px"}}
                                   onKeyPress={(e) => {
                                       if (e.key === 'Enter') {
                                            navigate(`/products/?q=${search}`);
                                       }
                                   }}
                                   InputProps={
                                       {endAdornment: <InputAdornment position="end">
                                               <IconButton type="submit" component={Link} to={`/products/?q=${search}`}>
                                                   <Search sx={{color:"gray"}}/>
                                               </IconButton>
                                           </InputAdornment>,
                                       }
                                   }
                        />
                    </MenuItem>
                    <MenuItem component={Link} to={"/register"}><Button variant="text" >REGISTER</Button></MenuItem>
                    <MenuItem component={Link} to={"/login"}><Button variant="text"  >SIGN IN</Button></MenuItem>
                </Menu>
            </Box>
            <Box sx={{flex: 1, textAlign: "center", flexWrap:"wrap"}}>
                <Box component={Link} to={"/"} style={{ textDecoration: 'none', color:"inherit" }}>
                    <Typography variant="h1" display="inline" sx={{fontWeight: 500}}>CONDE</Typography>
                    <Typography variant="h1" display="inline" color="primary" sx={{fontWeight: 500}}>L</Typography>
                </Box>
            </Box>
            <Box sx={{flex: 1, display: "flex",  alignItems:"center", justifyContent: "flex-end"}}>
                <Badge component={Link} to={"/cart"} badgeContent={props.quantity} color="primary" sx={{marginLeft: "25px"}}>
                    <ShoppingCartOutlined sx={{color:"black"}}/>
                </Badge>
            </Box>
        </Toolbar>
    )
}

const DesktopNavbar = (props) =>{
    const [search, setSearch] = useState("");

    let navigate = useNavigate();

    return(
        <Toolbar sx={{padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems:"center"}}>
            <Box sx={{flex: 1, display: "flex", alignItems:"center"}}>
                <Box sx={{display: "flex", alignItems:"center", marginLeft: "25px", padding: "5px"}}>
                    <TextField size="small" placeholder="Search product"
                               onChange={(e)=>setSearch(e.target.value)}
                               sx={{marginRight:"2px"}}
                               onKeyPress={(e) => {
                                   if (e.key === 'Enter') {
                                       navigate(`/products/?q=${search}`);
                                   }
                               }}
                               InputProps={
                        {endAdornment: <InputAdornment position="end">
                                <IconButton type="submit" component={Link} to={`/products/?q=${search}`}>
                                    <Search sx={{color:"gray"}}/>
                                </IconButton>
                            </InputAdornment>
                        }
                    }
                    />

                </Box>
            </Box>
            <Box sx={{flex: 1, textAlign: "center", flexWrap:"wrap"}}>
                <Box component={Link} to={"/"} style={{ textDecoration: 'none', color:"inherit" }}>
                    <Typography variant="h1" display="inline" sx={{fontWeight: 500}}>CONDE</Typography>
                    <Typography variant="h1" display="inline" color="primary" sx={{fontWeight: 500}}>L</Typography>
                </Box>
            </Box>
            <Box sx={{flex: 1, display: "flex",  alignItems:"center", justifyContent: "flex-end"}}>
                <Button variant="text" component={Link} to={"/register"} sx={{marginLeft: "25px",":hover":{color:"primary.dark"}}}>REGISTER</Button>
                <Button variant="text" component={Link} to={"/login"} sx={{marginLeft: "25px",":hover":{color:"primary.dark"}}}>SIGN IN</Button>
                <Badge component={Link} to={"/cart"} badgeContent={props.quantity} color="primary" sx={{marginLeft: "25px"}}>
                    <ShoppingCartOutlined sx={{color:"black"}}/>
                </Badge>
            </Box>
        </Toolbar>
    )
}

export default Navbar