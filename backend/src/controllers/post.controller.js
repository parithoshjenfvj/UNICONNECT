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

async function getPosts(req,res){
    try{
        const userId = req.user._id;
        let posts=await postModel.find({userId:userId})
        res.status(200).json({
            posts
        })
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch posts",
            error:error.message
        })
    }
}
module.exports={
    createPost,
    getPosts
}