const express = require('express');
const router = express.Router();
const {verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req,res) =>{
    //const months = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte:lastYear}}},
            {$project:{month:{$month:"$createdAt"},},},
            {$group: {_id:"$month", total:{$sum:1}}}
        ])
        res.status(200).json(data);
    }catch (err){
        res.status(500).json(err);
    }
})

// UPDATE USER
router.put('/:id', verifyTokenAndAuth, async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PRIV_KEY).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true});
        const {password, ...others} = updatedUser._doc;

        res.status(200).json(others);
    } catch(err){
        res.status(500).json(err);
    }

})

//DELETE USER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User successfully deleted");
    }catch (err){
        res.status(500).json(err);
    }
})

//GET USER
router.get("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch (err){
        res.status(500).json(err);
    }
})

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    const query = req.query.new
    try{
        const users = query? await User.find().sort({_id: -1}).limit(query) : await User.find();
        res.status(200).json(users);
    }catch (err){
        res.status(500).json(err);
    }
})


module.exports = router;
