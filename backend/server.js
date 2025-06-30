import express from 'express'
import mongoose from 'mongoose'
import dishRouter from './router/dish.router.js'
import cors from 'cors'
import userRouter from './router/user.router.js'
import aiRouter from './router/AIreport.router.js'
import connectToDB from './db.config.js'

connectToDB()
const app=express()
app.use(cors())
app.use(express.json())

app.use('/dish',dishRouter)
app.use('/user',userRouter)
app.use('/ai',aiRouter)
app.listen(8000,()=>{
    console.log("server run on 8000")
})