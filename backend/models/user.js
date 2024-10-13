import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name:String,
    email:String,
    picture:String
})

export const User = mongoose.model("User",userShema) 
