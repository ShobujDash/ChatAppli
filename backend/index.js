// const express = require('express');
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser'
import { connectDB } from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
dotenv.config({});
const app = express();


// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routeing
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});

