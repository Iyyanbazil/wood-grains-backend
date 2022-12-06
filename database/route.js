
const express=require("express")
const Proute=express.Router()

// const controller=require("./controller")
const {show,sign,login,AddItem,getItems,delItem,Count,getcount,orders,getOrders,delOrder}=require("./controller")
Proute.get("/",show)
// Proute.post("/",cart)
// route for login
Proute.post("/sign",sign)
Proute.post("/login",login)

//Cart Routes
Proute.post("/",AddItem)
Proute.get("/:userID/cart",getItems)
// Proute.post("/:userID/cart",setCart)
// Croute.post("/",getCart)
Proute.delete("/:userID/cart",delItem)
Proute.get("/count",Count)
Proute.post("/count",getcount)
Proute.post("/search",AddItem)

Proute.post("/:id/address",orders)
Proute.get("/:id/order",getOrders)
Proute.delete("/:id/order",delOrder)
module.exports=Proute;

