const express = require('express');
const {verifyTokenAndAdmin, verifyTokenAndAuth, verifyToken} = require("./verifyToken");
const Order = require("../models/Order");
const router = express.Router();

//CREATE Order
router.post("/", verifyToken, async (req, res) =>{
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err){
        res.status(500).json(err);
    }
})

//UPDATE Order
router.put('/:id', verifyTokenAndAdmin, async (req,res)=>{

    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true});

        res.status(200).json(updatedOrder);
    } catch(err){
        res.status(500).json(err);
    }

})

//DELETE Order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order successfully deleted");
    }catch (err){
        res.status(500).json(err);
    }
})

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req,res) =>{
    //const months = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte:prevMonth}}},
            {$project:{month:{$month:"$createdAt"}, sales:"$amount"},},
            {$group: {_id:"$month", total:{$sum:"$sales"}}}
        ]);
        res.status(200).json(income);
    }catch (err){
        res.status(500).json(err);
    }
})

//GET USER Orders
router.get("/:id", verifyTokenAndAuth, async (req, res) =>{
    try{
        const order = await Order.find({userID: req.params.id});
        res.status(200).json(order);
    }catch (err){
        res.status(500).json(err);
    }
})

//GET ALL Orders
router.get("/",verifyTokenAndAdmin, async (req, res) =>{

    try{
        const orders = await Order.find();

        res.status(200).json(orders);
    }catch (err){
        res.status(500).json(err);
    }
})

module.exports = router;
