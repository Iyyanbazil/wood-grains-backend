const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema(
    {
     productId:String,
     orderid:String,
     userId:String,
     pid:String,
     name:String,
     email:String,
     number:String,
     address:String,
     additional:String,
     payment:String,
     color:String,
     quantity:String,
     order:[Object],
    //  pro:[Object],
     
    },
    {timestamps:true}

)
const Order=mongoose.model("Order",orderSchema)
module.exports= Order;