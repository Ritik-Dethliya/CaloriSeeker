import { model, Schema } from "mongoose";

const userSchema=new Schema({
    name:{type:String},
    avtar:{type:String},
    age:{type:Number,default:18},
    email:{type:String,require:true,unique:true},
    BMR:{type:Number,default:1566.25},
    TDEE:{type:Number,default:2153.59},
    phone:{type:Number,require:true,unique:true},
    password:{type:String},
    weight:{type:Number,default:65},
    height:{type:Number,default:169},
    gender:{type:String,enum:['male','female','other']},
    goal:{type:String,enum:['gainWeigth','loseWeigth','normal']},
    isPremium:{type:Boolean}
},{timestamps:true})

export default model('user',userSchema)