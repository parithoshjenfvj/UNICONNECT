const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"name is required in this field"]
    },
    email:{
        type:String,
        required:[true,"email is required in this field"]
    },
    universityName:{
        type:String,
        required:[true,"universityName is required in this field"]
    },
    password:{
        type:String,
        required:[true,"password is required in this field"]
    }
})
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;