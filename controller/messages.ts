import { Request,Response } from "express"
import { Message } from "../models/message";


export const sendMessage =async  (req:Request , res:Response)=>{
    try{
        const {senderId, message, username} = req.body;
        let result = await Message.create({
            senderId,
            message,
            username
        })
        res.status(200).json({success:true,message:"successfully message sent"})
        return 

    }catch(error){
        res.status(500).json({success:false,message:"error in sending the data"})
        return 
    }
}

export const getAllMessages = async (req:Request ,res:Response) =>{
    try{
        let result = await Message.find({});
        res.status(200).json({success:true,data:result})
        return
    }
    catch{
        res.status(500).json({success:false,message:"error at the fetching data from database"})
        return
    }
}