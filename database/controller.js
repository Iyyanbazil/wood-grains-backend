const Product=require("./ProductSchema")
const User=require("./userSchema")
const Cart=require("./cartSchema")
const Order=require("./orderSchema")
const mongoose=require("mongoose")

 const show=async(req,res)=>{
    const all= await Product.find({})
    res.json(all)
 
}

const sign=async(req,res)=>{
  const {Fname,Lname,email,password,Cpassword}=req.body
  User.findOne({email:email},(err,user)=>{
    if(user){
      res.json({msg:"user exist"})
      
    }else{
      User.create({
        Fname:Fname,
        Lname:Lname,
        email:email,
        password:password,
        Cpassword:Cpassword,
      })
      res.json({msg:"done"})
        }
    }
  )
}

const login=async (req,res)=>{
  const {email,password}=req.body
  const data=User.findOne({email:email},(err,user)=>{
    if(user){
      if(user.password===password){
        res.json(user)
      }else{
        res.send("incorrect password")
        console.log("incorrect password");
      }
    }else{
      res.json({msg:"No such user exist"})
      console.log(" no such user exist");
    }
  })
}

const AddItem = async (req,res)=>{
const {id,userAdd}=req.body
const pro=await Product.findOne({_id:id})
const fill=await Cart.findOne({user:userAdd})
  if(fill){
   const newres= await Cart.updateOne({user:userAdd},{$addToSet:{CartData:pro} })
   if(newres){
    const find=await Cart.findOne({user:userAdd})
      if(find){
       
        console.log(find.CartData.length)
        res.json({msg:find.CartData.length})
        const update= await User.updateOne({_id:userAdd},{$set:{cart:find.CartData.length}})
      }
    }
  
    const length=fill.CartData.length
    const tostri=length.toString()
  }else{
    const cart=new Cart({
      user:userAdd,
      CartData:[]
    })
    cart.save()
  }

}

const getItems=(req,res)=>{
// const {userID}=req.body
const {userID}=req.params;
Cart.findOne({user:userID},(err,user)=>{
  if(user){
    res.json(user)
  }else{
    res.json({msg:"no user"})
  }
})
// console.log(userID)
}
const getCart=(req,res)=>{
const {current}=req.body
// console.log(current)
}


const delItem=async (req,res)=>{
const {ides}=req.body
const {userID}=req.params

var id = mongoose.Types.ObjectId(ides);

const respi= await Cart.updateOne({user:userID},{$pull:{CartData:{_id:id}}},{ multi: false })

const deli=await Cart.findOne({user:userID})
if(deli){

  await User.updateOne({_id:userID},{$set:{cart:deli.CartData.length}})
 
    res.json({msg:deli.CartData.length,msg:"deleted from cart"})
 
}



}
const Count=async(req,res)=>{

const data=await Cart.findOne({})
res.json(data)
}
const getcount=async (req,res)=>{
  const {user}=req.body
  
 User.findOne({_id:user},(err,user)=>{
 
    if(user){
      res.json({msg:user.cart})
      
    }
  })
  
}

const orders=async(req,res)=>{
const {uid,pid,name,email,number,address,additional,payment,color,quantity,time,date,orderid}=req.body
console.log("done")
console.log(req.body)
const fill=await Order.findOne({userId:uid})
const pro=await Product.findOne({_id:pid})
const already= await Order.findOne({order:{pro:{_id:pid}}})
console.log(already)
  if(fill){
   const newres= await Order.updateOne({userId:uid},{$addToSet:{order:{pid,name,email,number,address,additional,payment,color,quantity,time,date,orderid,pro}}})
  // const newer=await Order.updateOne({userId:uid},{$set:{pid,name,email,number,address,additional,payment,color,quantity,time,date}})
  // const all= await Order.updateOne({userId:uid},{$addToSet:{pro}})
 res.json({msg:"done"})
  }else{
    const order=new Order({
      userId:uid,
      order:[{pid,name,email,number,address,additional,payment,color,quantity,time,date,orderid,pro}]
    })
    order.save()
    res.json({msg:"done"})
  }
}
const getOrders=async(req,res)=>{
  const {id}=req.params
  console.log("from orders")
  console.log(id)
 const user= await Order.findOne({userId:id})
 if(user){
  res.json(user)
  console.log(user)
 }
}

const delOrder=async(req,res)=>{
  const {id}=req.params;
  const {proid,time}=req.body;
  console.log(id)
  console.log(proid)
  console.log(time)
  const user= Order.findOne({_id:id});
 
    const respi= await Order.updateOne({userId:id},{$pull:{order:{time:time}}})
 if(respi){
  res.json({msg:"deleted"})
 }
}
module.exports={
    show,
    sign,
    login,
    AddItem,
    getItems,
    getCart,
    delItem,
    Count,
    getcount,
    // setCart,
    orders,
    getOrders,
    delOrder,
}