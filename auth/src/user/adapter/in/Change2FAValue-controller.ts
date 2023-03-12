import {DefaultController} from "../../../shared/objectUtils/DefaultController";
import {isOwner} from "../../../shared/middleware/IsOwner";
import {UpdateUserService} from "../../application/service/UpdateUser-service";
import {CODE_OK} from "../../../shared/enums/Errors";
import {ErrResponseService} from "../../../shared/errors/ErrorService";
import {User} from "../../domain/User";
import {UserOutputDto} from "../out/dto/UserOutputDto";

export class Change2FAValueController extends DefaultController {

    private updateUserService: UpdateUserService;

    constructor() {
        super();
        this.updateUserService = new UpdateUserService();
    }

    public change2FAValue() {
        return this.router.patch('/:uid', isOwner, async (req, res) => {
            this.defaultErrData();
            const user: User = {
                isActive2fa: req.body.isActive2fa
            }
            const data: any = await this.updateUserService.partialUpdateUser(user, req.params.uid);
            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? this.toOutoutDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        });
    }

    private toOutoutDto(data): UserOutputDto {
        return {
            uid: data.uid,
            email: data.email,
            isActive2fa: data.isActive2fa,
            availableInvitations: data.availableInvitations,
            consumedInvitations: data.consumedInvitations
        }
    }
}