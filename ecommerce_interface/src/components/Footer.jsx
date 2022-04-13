import {Facebook, Instagram, MailOutline, Phone, Room, Twitter} from "@mui/icons-material";
import {Box, Divider, Grid, IconButton, Link, List, ListItem, Typography, useMediaQuery} from "@mui/material";


const Footer = () =>{
    const matches = useMediaQuery((theme) => theme.breakpoints.down('md'));


    return(
        <Box display="flex" sx={{flexDirection:{xs:"column", md:"row"}, backgroundColor: "seashell"}}>
            <Box  flexGrow={1} sx={{display: "flex", flexDirection: "column", padding:"20px 0px 20px 20px"}}>
                <Box>
                    <Typography variant="h3" display="inline" sx={{fontWeight:500}}>CONDE</Typography>
                    <Typography variant="h3" display="inline" color="primary" sx={{fontWeight:500}}>L</Typography>
                </Box>
                <Typography sx={{  margin: "20px 0px",fontWeight:500}}>Fullstack React Demo Site</Typography>
                <Box sx={{display:"flex"}}>
                    <IconButton disableRipple component={Link} href="https://www.facebook.com" rel="noopener noreferrer" sx={{backgroundColor:"blue", color:"white", marginRight: "10px"}}>
                        <Facebook/>
                    </IconButton>
                    <IconButton disableRipple component={Link} href="https://www.instagram.com" rel="noopener noreferrer" sx={{backgroundColor:"red", color:"white", marginRight: "10px"}}>
                        <Instagram/>
                    </IconButton>
                    <IconButton disableRipple component={Link} href="https://www.twitter.com" rel="noopener noreferrer" sx={{backgroundColor:"lightblue",color:"white"}}>
                        <Twitter/>
                    </IconButton>
                </Box>
            </Box>
            <Box flexGrow={0.1}>
            <Divider orientation={matches?"horizontal": "vertical"} variant="middle"/>
            </Box>
            <Box flexGrow={0.5} sx={{ padding:"20px 0px 20px 20px", display:{xs:"none", md:"initial"}}}>
                <Typography variant="h3" sx={{ marginBottom: "30px",fontWeight:500}}>Useful Links</Typography>
                <Grid container component={List}>
                    <Grid item xs={12} md={6} component={ListItem}>Bulbasaur</Grid>
                    <Grid item xs={12} md={6} component={ListItem}>Charmander</Grid>
                    <Grid item xs={12} md={6} component={ListItem}>Squirtle</Grid>
                    <Grid item xs={12} md={6} component={ListItem}>Pikachu</Grid>
                </Grid>
            </Box>
            <Box flexGrow={0.1} sx={{display:{xs:"none", md:"initial"}}}>
                <Divider orientation="vertical"/>
            </Box>
            <Box flexGrow={1} sx={{padding: "20px"}}>
                <Typography variant="h3" sx={{ marginBottom: "30px",fontWeight:500}}>Contact</Typography>
                <Box sx={{marginBottom: "20px", display: "flex", alignItems: "center"}}>
                    <Room style={{marginRight:"10px"}}/> Address
                </Box>
                <Box sx={{marginBottom: "20px", display: "flex", alignItems: "center"}}>
                    <Phone style={{marginRight:"10px"}}/> +224 610 39 13 93
                </Box>
                <Box sx={{marginBottom: "20px", display: "flex", alignItems: "center"}}>
                    <MailOutline style={{marginRight:"10px"}}/>
                    <Link href="mailto:lancine.condee@gmail.com">lancine.condee@gmail.com</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer