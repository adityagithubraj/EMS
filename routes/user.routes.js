const express=require("express");
const { User } = require("../model/user");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router();




userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        let user=new User({email,password:hashedPassword})
        await user.save()    
        res.status(201).send({msg:"Signup successful"})
    } catch (error) {
        console.log(error)
        res.send({msg:"something went wrong",error})
    }
})
//..........................................login
userRouter.post("/login",async(req,res)=>{
    
    const {email,password}=req.body;
    try {
        const user=await User.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({email:email,userid:user[0]._id},"masai")
                    res.send({"msg":'logged in',token:token})
                }else{
                    res.send({msg:"something went wrong"})
                }
            })
        }else{
            res.send({"msg":"Invalid credentials"})
        }
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})

 

 
 //........export model.....
module.exports={
    userRouter
}