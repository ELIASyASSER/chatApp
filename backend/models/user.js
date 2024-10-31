import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name:String,
    email:String,
    picture:String,
    
    lastActive:{
        type:Date,
        default:Date.now()
    }
    
},{timestamps:true})

export const User = mongoose.model("User",userShema) 
