import express from "express";

import {
  createUser,
  getAllUsers
} from "../controllers/user";

const userRoute = express.Router()

userRoute
	.route("/")
  .get(getAllUsers)
  .post(createUser);
	
export default userRoute;