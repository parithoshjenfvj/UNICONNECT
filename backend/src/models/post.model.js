const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trime:true
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const postModel=mongoose.model("post",postSchema);
module.exports=postModel;