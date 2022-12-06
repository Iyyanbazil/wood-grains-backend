

Mongo_Uri=process.env.MONGO_URI
const mongoose=require("mongoose")

 const connectDb=async(url)=>{
await mongoose.connect(Mongo_Uri).then(()=>{
    console.log("connected to database");
})

}
module.exports=connectDb