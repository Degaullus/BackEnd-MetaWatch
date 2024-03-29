import express from "express";

import {
  createUser,
} from "../controllers/user";

const api = express.Router()

api
	.route("/")
  .post(createUser);
	
export default api;