const express = require('express');
const {verifyTokenAndAdmin} = require("./verifyToken");
const Product = require("../models/Product");
const router = express.Router();

//CREATE PRODUCT
router.post("/", async (req, res) =>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err){
        res.status(500).json(err);
    }
})

//UPDATE PRODUCT
router.put('/:id', verifyTokenAndAdmin, async (req,res)=>{

    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true});

        res.status(200).json(updatedProduct);
    } catch(err){
        res.status(500).json(err);
    }

})

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product successfully deleted");
    }catch (err){
        res.status(500).json(err);
    }
})

//GET PRODUCT
router.get("/:id", async (req, res) =>{
    try{
        await Product.findById(req.params.id).then(product=>{
            res.status(200).json(product);
        })
            .catch(err =>{
                res.status(500).json(err);
            })
    }catch (err){
        res.status(500).json(err);
    }
})

//GET PRODUCTS BY CATEGORY
router.get("/category/:category", async (req, res) =>{
    const qNew = req.query.new;
    try{
        let products
        if(qNew){
            await Product.find({
                categories: {
                    $in: req.params.category,
                },
            }).sort({createdAt: -1}).limit(3)
                .then(p=>{
                    products=p;
                }).catch(err =>{
                    res.status(500).json(err);
                });
        }else {
            await Product.find({
                categories: {
                    $in: req.params.category,
                },
            })
                .then(p=>{
                    products=p;
                }).catch(err =>{
                    res.status(500).json(err);
                });
        }

        res.status(200).json(products);

    }catch (err){
        res.status(500).json(err);
    }
})

//GET ALL PRODUCTS
router.get("/", async (req, res) =>{
    const qNew = req.query.new;
    const query = req.query.q;
    try{
        let products;
        if(query){
            await Product.find({
                    $text: {
                        $search: query
                    }
                }
            )
                .then(p=>{
                    products=p;
                }).catch(err =>{
                    res.status(500).json(err);
                });

        } else if(qNew){
            await Product.find().sort({createdAt: -1}).limit(3)
                .then(p=>{
                    products=p;
                }).catch(err =>{
                    res.status(500).json(err);
                });
        } else {
            await Product.find()
                .then(p => {
                    products = p;
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
        res.status(200).json(products);
    }catch (err){
        res.status(500).json(err);
    }
})

module.exports = router;
