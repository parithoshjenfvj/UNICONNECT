require("dotenv").config();
const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
const userAuthRoutes=require("./routes/userAuth.routes");
const dashboardRoutes=require("./routes/dashboard.routes");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // Vite frontend
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",userAuthRoutes)
app.use("/user",dashboardRoutes)
module.exports=app;