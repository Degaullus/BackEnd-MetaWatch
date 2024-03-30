import express from "express";
import { loginUser, signupUser } from "../controllers/userAuth";

const userAuth = express.Router();

userAuth
  .route("/login")
  .post(loginUser);

userAuth
  .route("/signup")
  .post(signupUser);

export default userAuth;