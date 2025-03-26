import mongoose from "mongoose";

type coOrdinates = {
    longitude : number,
    lattitude :number
}

export interface IUser {
    name:string,
    locate:coOrdinates
}
export interface IUserDoc extends IUser,Document {
    createdAt:Date,
    updatedAt:Date,
    _id:mongoose.Types.ObjectId
}
const userSchema = new mongoose.Schema<IUserDoc>({
    name:String,
    locate:{
        lattitude:Number,
        longitude:Number,
    }
},{timestamps:true})

export const User = mongoose.model('user',userSchema)