import express from "express";
import {connectDB} from "./mongodb";
require('dotenv').config({path:'./config.env'});

const app= express();
const PORT= process.env.PORT || 5000;

//connect to db
connectDB()

const server=app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    }
)
