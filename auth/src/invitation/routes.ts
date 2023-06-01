import express from "express";
import {InviteUserController} from "./adapter/in/controller/InviteUser-controller";
import {FindInvitationByTokenController} from "./adapter/in/controller/FindInvitationByToken-controller";

const router = express.Router();

const inviteUserController: InviteUserController = new InviteUserController();
const findInvitationByTokenController: FindInvitationByTokenController = new FindInvitationByTokenController();

router.use("/invite-user", inviteUserController.inviteUser());
router.use("/find-by-token", findInvitationByTokenController.findInvitationByToken());
export const invitationRoutes = router;