require("dotenv").config();
const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
const userAuthRoutes=require("./routes/userAuth.routes");

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",userAuthRoutes)
module.exports=app;