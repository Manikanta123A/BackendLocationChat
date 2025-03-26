import { Request } from "express"
import { Response } from "express"
import { User } from "../models/user";

export const addUser =async (req:Request, res:Response):Promise<void>=>{
    try{
        const {name} = req.body;
        let user = await User.findOne({name});
        if (user){
            res.status(404).json({success:false,message:"User with the same name exists"});
            return
        }
        let response = await User.create({
            name
        })
        res.cookie("token", name, {
            httpOnly: true,   // Prevents client-side JavaScript access
            secure: true,     // Ensures the cookie is sent only over HTTPS (set `false` for local dev)
            sameSite: "lax",  // Protects against CSRF attacks
            maxAge: 90*24 * 60 * 60 * 1000, // Expires in 24 hours
        });
        res.status(200).json({success:true, message:"Successfully created"})
        return
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"error in retrieving"})
    }

}
export const addLocation = async(req:Request, res:Response):Promise<void>=>{
    const { locationC } = req.body;
    if (!locationC || !locationC.lattitude || !locationC.longitude) {
        res.status(400).json({ success: false, message: "Invalid location data" });
        return;
    }

    const user = await User.findById(req?.id); // Ensure req.user.id exists

    if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
    }

    user.locate = {
        lattitude: locationC.lattitude, // Fixed spelling "latitude"
        longitude: locationC.longitude,
    };

    await user.save();
    res.status(200).json({ success: true, message: "Successfully updated/added" });
}

export const getLocation = async(req:Request,res:Response)=>{
    try{
        const user = await User.findById(req.id);
        if(user){
            res.status(200).json({success:true, lattitude : user.locate.lattitude, longitude:user.locate.longitude})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"error in retrieving"});
    }
}
export const getAll = async(req:Request, res:Response)=>{
    try{
        const data = await User.find(
            { "locate.lattitude": { $exists: true }, "locate.longitude": { $exists: true } }, 
            { name: 1, "locate.lattitude": 1, "locate.longitude": 1, _id: 0 }
        );
        const transformedData = data.map((user: any) => ({
            lattitude: user.locate.lattitude,
            longitude: user.locate.longitude,
            name: user.name
          }));
        res.status(200).json({success:true, data:transformedData })
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"error in retrieving"});
    }
}