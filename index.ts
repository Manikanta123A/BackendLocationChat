import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import messageRouter from './routes/messageRouter'
import connectDb from './db/connectDb';
import userRouter from './routes/userRouter';
import cookieparser from 'cookie-parser'
import {app, server,io} from './socket/socket'

dotenv.config();
// const app = express();
const port = process.env.port || 5000;

app.use(cookieparser())
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "https://traveltogeorgia.onrender.com"] ,// Replace with your frontend URL
    credentials: true, // Allow cookies
}));



app.use("/user",userRouter);
app.use("/message",messageRouter);
server.listen(port , ()=> {
    connectDb();
    console.log("listening to the port $port")
})
