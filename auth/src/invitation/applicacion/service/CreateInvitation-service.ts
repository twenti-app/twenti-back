import {CreateInvitationPort} from "../port/CreateInvitation-port";
import {Invitation} from "../../domain/Invitation";
import {InvitationModel} from "../../adapter/out/persistence/InvitationModel";
import {CODE_INTERNAL_SERVER_ERROR} from "../../../shared/enums/Errors";

export class CreateInvitationService implements CreateInvitationPort {
    createInvitation(invitation: Invitation) {
        const savedData = new InvitationModel(invitation);
        return savedData.save()
            .then(r => {
                return r;
            }).catch((error) => {
                return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}}
            });
    }
}