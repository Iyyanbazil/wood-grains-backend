const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    Fname:String,
    Lname:String,
    email:String,
    password:String,
    Cpassword:String,
    cart:{type:String}
   
})

const User=mongoose.model("User",UserSchema);
module.exports=User