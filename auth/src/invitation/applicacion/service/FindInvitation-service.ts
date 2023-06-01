import {FindInvitationPort} from "../port/FindInvitation-port";
import {InvitationModel} from "../../adapter/out/persistence/InvitationModel";
import {CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND} from "../../../shared/enums/Errors";

export class FindInvitationService implements FindInvitationPort {
    findInvitationByToken(token: string) {
        return InvitationModel.findOne({token}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'Invitation not found with token ' + token}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }

    findInvitationByEmail(email: string) {
        return InvitationModel.find({email}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'Invitations not found with email ' + email}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }

}