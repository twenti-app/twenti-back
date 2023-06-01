import {Invitation} from "../../domain/Invitation";

export interface UpdateInvitationPort {
    partialUpdateInvitation(invitation: Invitation, token:string);
}