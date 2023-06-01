import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {authenticate} from "../../../../shared/middleware/IsAuthenticate";
import {InviteUserOutputDto} from "../../out/dto/InviteUserOutputDto";
import {FindInvitationService} from "../../../applicacion/service/FindInvitation-service";

export class FindInvitationByTokenController extends DefaultController {
    private findInvitationService: FindInvitationService;
    constructor() {
        super();
        this.findInvitationService = new FindInvitationService();
    }

    public findInvitationByToken(){
        return this.router.get('/:token', authenticate, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.findInvitationService.findInvitationByToken(req.params.token);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? this.getOutputDto(data) : ErrResponseService(this.err);
            console.log(resp)
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