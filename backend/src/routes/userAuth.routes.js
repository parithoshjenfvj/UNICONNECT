const express=require("express");
const router=express.Router();
const userController=require("../controllers/user.controller");
router.post("/user/register",userController.userRegistration)
router.post("/user/login",userController.userLogin)
router.post("/user/logout",userController.userLogout)
module.exports=router;