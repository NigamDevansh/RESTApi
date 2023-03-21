require("dotenv").config();
const connectDB= require("./database/db");
const productsSchema= require("./models/productsSchema");

const productsJson= require("./products.json");

const start= async()=> {
    try {
        await connectDB(process.env.MONGODB_URL);
        // this will not allow multiple insertions of same data and will first delete then copy the new data in DB
        await productsSchema.deleteMany();
        await productsSchema.create(productsJson);
        console.log("Success !")
    } catch (error) {
        console.log(error);
    }
}

start();