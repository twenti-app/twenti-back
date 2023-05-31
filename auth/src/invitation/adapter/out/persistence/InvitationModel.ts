import {model} from "mongoose";
import {InvitationSchema} from "./InvitationSchema";

export const InvitationModel = model('Invitation', InvitationSchema);