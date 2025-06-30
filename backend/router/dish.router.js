import express from 'express'
import Dish from '../model/dish.model.js'
const dishRouter=express.Router()

dishRouter.get("/getdish",async(req,res)=>{
    let data=await Dish.find()
    res.send({data})
})

dishRouter.get('/getDetails/:name',async(req,res)=>{
    try {
        console.log("hi")
        let {name}=req.params
        console.log(name)
        let regxWords=name.split(" ").map((item)=>
            (
                {FoodItem:{$regex:`^\\s*${item}\\s*$`,$options :'i'}}
            )
        )
        let data=await Dish.find({$or:regxWords})
        res.status(200).send({"fooditems data":data})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"Something went wrong"})
    }
})
export default dishRouter