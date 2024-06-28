// const express = require('express');
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/database.js";
import messageRoute from "./routes/messageRoute.js";
import userRoute from "./routes/userRoute.js";
import { app,server } from "./socket/socket.js";
dotenv.config({});



// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

// routeing
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
