import express from "express";
import {Change2FAValueController} from "./adapter/in/Change2FAValue-controller";

const router = express.Router();

const change2FAValueController = new Change2FAValueController();

router.use("/update2FA", change2FAValueController.change2FAValue());
export const userRoutes = router;