import express from "express";
import {InviteUserController} from "./adapter/in/controller/InviteUser-controller";
import {FindInvitationByTokenController} from "./adapter/in/controller/FindInvitationByToken-controller";
import {FindInvitationsByEmailController} from "./adapter/in/controller/FindInvitationsByEmail-controller";

const router = express.Router();

const inviteUserController: InviteUserController = new InviteUserController();
const findInvitationByTokenController: FindInvitationByTokenController = new FindInvitationByTokenController();
const findInvitationsByEmailController: FindInvitationsByEmailController = new FindInvitationsByEmailController();

router.use("/invite-user", inviteUserController.inviteUser());
router.use("/find-by-token", findInvitationByTokenController.findInvitationByToken());
router.use("/find-by-email", findInvitationsByEmailController.findInvitationByEmail());
export const invitationRoutes = router;