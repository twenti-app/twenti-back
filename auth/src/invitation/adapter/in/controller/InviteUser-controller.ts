import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {UpdateUserService} from "../../../../user/application/service/UpdateUser-service";
import {isOwnerEmail} from "../../../../shared/middleware/IsOwner";
import {FindUserService} from "../../../../user/application/service/FindUser-service";
import {InviteUserInputDto} from "../dto/InviteUserInputDto";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {
    CODE_BAD_REQUEST,
    CODE_CONFLICT, CODE_FORBIDDEN,
    CODE_OK,
    CODE_UNPROCESSABLE_ENTITY
} from "../../../../shared/enums/Errors";
import {emailVerified} from "../../../../shared/stringUtils/EmailVerified";
import {CreateInvitationService} from "../../../applicacion/service/CreateInvitation-service";
import {Invitation} from "../../../domain/Invitation";
import {InviteUserOutputDto} from "../../out/dto/InviteUserOutputDto";

export class InviteUserController extends DefaultController {

    private updateUserService: UpdateUserService;
    private findUserService: FindUserService;
    private createInvitationService: CreateInvitationService;

    private guestEmailError:boolean = false;
    constructor() {
        super();
        this.updateUserService = new UpdateUserService();
        this.findUserService = new FindUserService();
        this.createInvitationService = new CreateInvitationService();
    }

    public inviteUser() {
        return this.router.post('/', isOwnerEmail, async (req, res) => {
            this.defaultErrData();
            const inviteUserInputDto: InviteUserInputDto = req.body;
            if (this.checkErrors(inviteUserInputDto)) {
                const resp = ErrResponseService({
                    status: 'Failure Request',
                    statusCode:this.guestEmailError ? CODE_UNPROCESSABLE_ENTITY : CODE_BAD_REQUEST,
                    message: this.guestEmailError ? 'Invalid guest email' : 'Email and addressee are required'
                });
                return res.status(this.guestEmailError ? CODE_UNPROCESSABLE_ENTITY : CODE_BAD_REQUEST).send(resp);
            }
            const usersValid = await this.checkUsers(inviteUserInputDto.email, inviteUserInputDto.guestEmail);
            if(usersValid) {
                return res.status(this.err.statusCode).send(ErrResponseService(this.err));
            }
            const response = await this.saveInvitation(inviteUserInputDto);
            return res.status(this.err.statusCode).send(response);
        });
    }

    private checkErrors(inputDto: InviteUserInputDto): boolean {
        this.guestEmailError = !emailVerified(inputDto.guestEmail);
        if (!inputDto.email) return true;
        if (!inputDto.guestEmail) return true;
        return this.guestEmailError;
    }

    private async checkUsers(userEmail: string, guestEmail: string) {
        const ownerUser: any = await this.findUserService.findUserByEmail(userEmail);
        const guestUser: any = await this.findUserService.findUserByEmail(guestEmail);
        if (ownerUser.err || !guestUser.err) {
            const error = ownerUser.err ?? {statusCode: CODE_CONFLICT, message: 'The guest email is already registered' };
            this.setErrData(error);
            return true;
        }
        if(ownerUser.availableInvitations <= 0) {
            this.setErrData({statusCode: CODE_FORBIDDEN, message: 'You do not have any available invitations to send' });
            return true;
        }
        return false;
    }

    private async saveInvitation(inputDto: InviteUserInputDto) {
        const invitation: Invitation = {
            reason: inputDto.reason,
            email: inputDto.email,
            guestEmail: inputDto.guestEmail
        }

        const data: any = await this.createInvitationService.createInvitation(invitation);
        console.log(data);
        if (data.err) this.setErrData(data.err);
        return this.err.statusCode === CODE_OK ? this.getOutputDto(data): ErrResponseService(this.err);
    }

    private getOutputDto(data:any) : InviteUserOutputDto{
        return {
            email: data.email,
            guestEmail: data.guestEmail,
            reason: data.reason,
            availableUntil: data. availableUntil,
            createdAt: data.createdAt,
            updatedAt:data.updatedAt
        }
    }
}