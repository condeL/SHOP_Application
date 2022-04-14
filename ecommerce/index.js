const express = require('express');
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/products")
const cartRoute = require("./routes/carts")
const orderRoute = require("./routes/orders")

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("DB connection successful"))
    .catch((err)=>console.log(err))
;
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/product", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)

app.listen(process.env.PORT || 8080, ()=>{
    console.log("Server started on port 8080");
    }
)
