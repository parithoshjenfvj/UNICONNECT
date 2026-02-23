const postModel=require("../models/post.model");
const storageService=require("../services/storage.service");
const {v4:uuid}=require("uuid");
async function createPost(req,res){
    const imageUplaodResult=await storageService.uploadFile(req.file.buffer,uuid())
    const postItem=await postModel.create({
        description:req.body.description,
        image:imageUplaodResult.url,
        userId:req.user._id
    })
    res.status(201).json({
        postItem
    })
}
module.exports={
    createPost
}