import mongoose, { mongo } from "mongoose";

const msgSchema = new mongoose.Schema({
    message:{
        type:String,
        trim:true
    },
    writer:{
        type:mongoose.Types.ObjectId,ref:"User"
    },
    receiver:{
        type:mongoose.Types.ObjectId,ref:"User"
    }
},{timestamps:true})

export const Msg = mongoose.model("Message",msgSchema)