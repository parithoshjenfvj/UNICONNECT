const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const multer=require("multer");
const postController=require("../controllers/post.controller");
const upload=multer({
    storage:multer.memoryStorage()
})
router.post("/",authMiddleware,upload.single("image"),postController.createPost)
module.exports=router;