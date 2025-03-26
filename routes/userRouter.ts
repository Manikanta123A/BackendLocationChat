import express from "express";
import { addLocation, addUser, getAll, getLocation } from "../controller/setUser";
import { isAuthenticated } from "../middleware/Auth";
const router = express.Router();

router.route("/login").post(addUser);

router.route('/location')
.get(isAuthenticated,getLocation)
.post(isAuthenticated,addLocation);

router.route("/all")
.get(getAll)

export default router;