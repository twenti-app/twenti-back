import express from "express";
import {SignUpController} from "./adapter/in/controller/SignUpController";
import {GenerateQrController} from "./adapter/in/controller/GenerateQrController";
import {LogInController} from "./adapter/in/controller/LogInController";
import {ValidateTokenController} from "./adapter/in/controller/ValidateTokenController";
import {RefreshTokenController} from "./adapter/in/controller/RefreshToken-controller";
import {SignOutController} from "./adapter/in/controller/SignOutController";
import {DeleteUserController} from "./adapter/in/controller/DeleteUser-controller";

const router = express.Router();
const signupController = new SignUpController();
const generateQrController = new GenerateQrController();
const logInController = new LogInController();
const checkTokenController = new ValidateTokenController();
const refreshTokenController = new RefreshTokenController();
const signOutController = new SignOutController();
const deleteUserController = new DeleteUserController();

router.use("/signUp", signupController.signup());
router.use("/generate", generateQrController.generateQr());
router.use("/validateToken", checkTokenController.validateToken());
router.use("/logIn", logInController.logIn());
router.use("/refreshToken", refreshTokenController.refreshToken());
router.use("/signOut", signOutController.signOut());
router.use("/delete", deleteUserController.deleteUser());

export const authenticationRoutes = router;