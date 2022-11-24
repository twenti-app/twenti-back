import express from "express";
import {SignUpController} from "./adapter/in/controller/SignUpController";

const router = express.Router();
const signupController = new SignUpController();

router.use("/signUp", signupController.signup());

export const authenticationRoutes = router;