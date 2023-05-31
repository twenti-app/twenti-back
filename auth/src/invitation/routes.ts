import express from "express";
import {InviteUserController} from "./adapter/in/controller/InviteUser-controller";

const router = express.Router();

const inviteUserController: InviteUserController = new InviteUserController();

router.use("/invite-user", inviteUserController.inviteUser());
export const invitationRoutes = router;