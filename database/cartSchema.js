const mongoose=require("mongoose")

const CartSchema=new mongoose.Schema({
    user:String,
    test:String,
    CartData:[Object],
})

const Cart=mongoose.model("Cart",CartSchema)
module.exports=Cart