import mongoose from "mongoose";
import { User } from "./user";


const messageSchema = new mongoose.Schema({
    username:String,
    senderId : {
        type:mongoose.Types.ObjectId,
        ref:User,
        required:true,
    },
    message:String,

}, {timestamps:true})

export const Message = mongoose.model("Message", messageSchema);