import express from "express";
import {SignUpController} from "./adapter/in/controller/SignUpController";
import {GenerateQrController} from "./adapter/in/controller/GenerateQrController";

const router = express.Router();
const signupController = new SignUpController();
const generateQrController = new GenerateQrController();

router.use("/signUp", signupController.signup());
router.use("/generate", generateQrController.generateQr());

export const authenticationRoutes = router;