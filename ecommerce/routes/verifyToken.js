const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user) =>{
            if(err){
                res.status(403).json("Invalid token");
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("User is not authenticated");
    }
}

const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.admin){
            next()
        } else{
            res.status(403).json("You are not allowed to do this operation")
        }
        })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.admin){
            next()
        } else{
            res.status(403).json("You are not allowed to do this operation")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin};