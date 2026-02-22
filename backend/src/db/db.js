const mongoose=require("mongoose");
function connectToDb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("connected to database");
    })
    .catch((err)=>{
        console.log("not connected to db",err);
    })
}
module.exports=connectToDb