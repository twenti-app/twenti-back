import express from "express";
import {Change2FAValueController} from "./adapter/in/Change2FAValue-controller";
import {DeleteUserController} from "./adapter/in/DeleteUser-controller";

const router = express.Router();

const change2FAValueController = new Change2FAValueController();

const deleteUserController = new DeleteUserController();
router.use("/update2FA", change2FAValueController.change2FAValue());
router.use("/delete", deleteUserController.deleteUser());
export const userRoutes = router;