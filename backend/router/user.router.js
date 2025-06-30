import e from "express";
import bcrypt from 'bcryptjs'
import userModel from "../model/user.model.js";
import jwt from 'jsonwebtoken'
import { isAuth } from "../middlewares/userAuth.js";
import mongoose from "mongoose";
const userRouter=e.Router()

const Avtar={
    male:"https://static.vecteezy.com/system/resources/thumbnails/024/183/525/small/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
    female:"https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
    other:'https://www.shutterstock.com/shutterstock/photos/1946799304/display_1500/stock-vector-avatar-of-a-transgender-man-office-worker-wearing-glasses-programmer-or-designer-young-student-1946799304.jpg'
}
let SaltRound=10
userRouter.post('/signup',async(req,res)=>{
    try {
        console.log(req.body)
        let {password}=req.body
        const hash = await bcrypt.hashSync(password,SaltRound )
        req.body.password=hash
        let user=await userModel.create(req.body)
        if(user){
            res.status(201).send({"msg":"user create Successful"})
        }
        
    } catch (error) {
        if(error.code==11000)res.status(404).send({msg:"User Already login With This Email Or Phone Number"})
        else{
            res.status(500).send({"msg":"Something Bad occure during user Creation"})
        }
        console.log(error.code)//11000
    }
})

userRouter.post('/login',async(req,res)=>{
    try {
        const {password,email}=req.body
        let user=await userModel.findOne({email:email})
        if(user){
            let verfy=await bcrypt.compare(password,user.password)
            
            if(verfy){
                let token=jwt.sign({userId:user._id},"ritik")
                res.status(200).send({token})
            }
            else{
                res.status(401).send({msg:"Password is incorrect"})
            }
        }
        else{
            res.status(401).send({msg:"User is Not Present Please Sign"})
        }
        
        
    } catch (error) {
        console.log(error)
    }
})
userRouter.patch("/updateuser",isAuth,async(req,res)=>{
    try {
        let userId=req.userId ;
        let user=await userModel.findById(userId);
        console.log("userId",userId)
        req.body.avtar=Avtar[req.body.gender]
        if(user){
            Object.assign(user,req.body);
            
            await user.save()
            res.status(200).send({'msg':"user Update Successfuly"});
        }
        else{
            res.status(404).send({msg:"user not Found"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Something went Wrong"});
    }
})

userRouter.get('/userdetails',isAuth,async(req,res)=>{
    try {
        let userId=req.userId ;
        let user=await userModel.findById(userId,{_id:0,__v:0,password:0});
        //console.log(user)

        if(!user)return res.status(404).send({"msg":"User Not Found"})
        res.status(200).send({user})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Something went Wrong"});
    }
})
export default userRouter