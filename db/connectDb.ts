import mongoose from "mongoose";

const connectDb = ()=>{
        mongoose.connect(process.env.mongo_url as string)
            .then(() => {
                console.log("success");
            })
            .catch(err => {
                console.log(err);
            });
}

export default connectDb;
