import mongoose from "mongoose"
const dishes=new mongoose.Schema({
    FoodCategory:{type:String},
    FoodItem:{type:String},
    energy:{type:String},
    energy_in_kj:{type:String},
    fat:{type:String,default:"0 g"},
    carbohydrates:{type:String,default:"0 g"},
    protein:{type:String,default:"0 g"},
    "vitamin A":{type:String,default:"0 g"},
    "vitamin C":{type:String,default:"0 g"},
    "vitamin D":{type:String,default:"0 g"},
    "vitamin K":{type:String,default:"0 g"},
    "vitamin B!":{type:String,default:"0 g"},
    "vitamin B2":{type:String,default:"0 g"},
    "vitamin B3":{type:String,default:"0 g"},
    "vitamin B5":{type:String,default:"0 g"},
    "vitamin B6":{type:String,default:"0 g"},
    "vitamin B9":{type:String,default:"0 g"},
    "vitamin B12":{type:String,default:"0 g"},
    iron:{type:String,default:"0 g"},
    potassium:{type:String,default:"0 g"},
    calcium:{type:String,default:"0 g"},
})

const Dish=mongoose.model("dish",dishes)
export default  Dish