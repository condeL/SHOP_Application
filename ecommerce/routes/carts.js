const express = require('express');
const {verifyTokenAndAdmin, verifyTokenAndAuth, verifyToken} = require("./verifyToken");
const Cart = require("../models/Cart");
const router = express.Router();

//CREATE Cart
router.post("/", verifyToken, async (req, res) =>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err){
        res.status(500).json(err);
    }
})

//UPDATE Cart
router.put('/:id', verifyTokenAndAuth, async (req,res)=>{

    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true});

        res.status(200).json(updatedCart);
    } catch(err){
        res.status(500).json(err);
    }

})

//DELETE Cart
router.delete("/:id", verifyTokenAndAuth, async (req, res) =>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart successfully deleted");
    }catch (err){
        res.status(500).json(err);
    }
})

//GET USER Cart
router.get("/:userId", verifyTokenAndAuth, async (req, res) =>{
    try{
        const cart = await Cart.findOne({userID: req.params.userId});
        res.status(200).json(cart);
    }catch (err){
        res.status(500).json(err);
    }
})

//GET ALL Carts
router.get("/",verifyTokenAndAdmin, async (req, res) =>{

    try{
        const carts = await Cart.find();

        res.status(200).json(carts);
    }catch (err){
        res.status(500).json(err);
    }
})

module.exports = router;
