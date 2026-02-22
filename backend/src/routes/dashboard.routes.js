const express=require("express");
const router=express.Router();
const userMiddleware=require("../middlewares/auth.middleware")
const dashboardController=require("../controllers/dashboard.controller")
router.get("/dashboard",userMiddleware,dashboardController)
module.exports=router;