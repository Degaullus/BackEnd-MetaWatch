import express from "express";

import {
  getAllUsers
} from "../controllers/user";

const userRoute = express.Router()

userRoute
	.route("/")
  .get(getAllUsers)
	
export default userRoute;