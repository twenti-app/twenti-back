import {Invitation} from "../../domain/Invitation";

export interface CreateInvitationPort {
    createInvitation(invitation: Invitation);
}