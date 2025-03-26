import { NextFunction,Response,Request } from "express";
import { User } from "../models/user";

declare global {
    namespace Express {
        interface Request {
            id: string; // Add the id property to the Request interface
        }
    }
}
export const isAuthenticated = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            res.status(400).json({success:false,message:"User not authenticated"});
            return;
        }
        let user = await User.findOne({name:token});
        if(!user){
            res.status(400).json({success:false, message:"User not found"});
            return;
        }
        req.id = user._id.toString();
        next();
    
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Error at the server"});
    }
    
}