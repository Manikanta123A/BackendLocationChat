import express from 'express'
import { getAllMessages, sendMessage } from '../controller/messages';


const router = express.Router();

router.route("/send")
.post(sendMessage)

router.route("/get")
.get(getAllMessages)

export default router;