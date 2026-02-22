const express=require("express");
const router=express.Router();
const userController=require("../controllers/user.controller");
router.post("/user/register",userController.userRegistration)
router.post("/user/login",userController.userLogin)
module.exports=router;