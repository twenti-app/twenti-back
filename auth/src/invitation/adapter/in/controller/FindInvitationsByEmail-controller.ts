import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {FindInvitationService} from "../../../applicacion/service/FindInvitation-service";
import {authenticate} from "../../../../shared/middleware/IsAuthenticate";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {InviteUserOutputDto} from "../../out/dto/InviteUserOutputDto";

export class FindInvitationsByEmailController extends DefaultController {
    private findInvitationService: FindInvitationService;
    constructor() {
        super();
        this.findInvitationService = new FindInvitationService();
    }

    public findInvitationByEmail(){
        return this.router.get('/:email', authenticate, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.findInvitationService.findInvitationByEmail(req.params.email);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? data.map(element => this.getOutputDto(element)) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        });
    }

    private getOutputDto(data: any): InviteUserOutputDto {
        return {
            email: data.email,
            guestEmail: data.guestEmail,
            reason: data.reason,
            availableUntil: data.availableUntil,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            beenUsed: data.beenUsed,
            token: data.token
        }
    }
}