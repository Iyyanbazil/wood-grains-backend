// import mongoose from 'mongoose'
const mongoose=require("mongoose")
 const ProductSchema= new mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    img:String,
    trending:Boolean,
    new:Boolean,
    rating:Number,
   //  images:[String],
    img1:String,
    img2:String,
    img3:String,
    cat:String,
    discount:Boolean,
    purpose:String,

 })

 const Product=mongoose.model("Product",ProductSchema);
 module.exports=Product