const express = require('express');
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

router.post("/register", async (req,res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PRIV_KEY).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err){
        res.status(500).json(err);
    }
})


router.post("/login", async (req,res) =>{

    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            res.status(401).json("Wrong Username")
        }else {

            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PRIV_KEY)
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            originalPassword !== req.body.password && res.status(401).json("Wrong password");

            const accessToken = jwt.sign({
                    id: user._id,
                    admin: user.admin,
                },
                process.env.JWT_KEY,
                {expiresIn: "3d"}
            );

            const {password, ...others} = user._doc;
            res.status(200).json({...others, accessToken});
        }
    } catch (err){
        res.status(500).json(err);
    }

})

module.exports = router;
