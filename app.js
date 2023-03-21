require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require('./database/db');

const PORT= process.env.PORT || 8080;
const router= require("./routes/products")

app.get('/', (req, res) => {
    res.send("LIVE");
})

// middleware
app.use("/api/products", router);

const start= async ()=> {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, ()=> {
            console.log("connected !");
        })
    } catch (error) {
        console.log(error);        
    }
}

start();
