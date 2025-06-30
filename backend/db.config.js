import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const URL=process.env.MONGO_URI ;
function connectToDB(){
    mongoose.connect(URL)
        .then(()=>console.log("Connect to db"))
        .catch((err)=>console.log("some thing wrong occure",err))
}
export default connectToDB