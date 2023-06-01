import {UpdateInvitationPort} from "../port/UpdateInvitation-port";
import {Invitation} from "../../domain/Invitation";
import {clean} from "../../../shared/objectUtils/Clean";
import {CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND} from "../../../shared/enums/Errors";
import {InvitationModel} from "../../adapter/out/persistence/InvitationModel";

export class UpdateInvitationService implements UpdateInvitationPort {
    partialUpdateInvitation(invitation: Invitation, token: string) {
        return InvitationModel.findOneAndUpdate({token}, clean(invitation), {new: true}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'Invitation not found with token ' + token}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }
}