import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {SignUpInputDto} from "../dto/SignUpInputDto";
import {SignUpService} from "../../../application/service/SignUpService";
import {SignUpModel} from "../../../domain/SignUpModel";
import {CODE_BAD_REQUEST, CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {SignUpOutputDto} from "../../out/dto/SignUpOutputDto";
import {CreateUserService} from "../../../../user/application/service/CreateUser-service";
import {FindInvitationService} from "../../../../invitation/applicacion/service/FindInvitation-service";
import {UpdateInvitationService} from "../../../../invitation/applicacion/service/UpdateInvitation-service";
import {Invitation} from "../../../../invitation/domain/Invitation";


export class SignUpController extends DefaultController {
    private signUpService: SignUpService;
    private createUserService: CreateUserService;
    private findInvitationService: FindInvitationService;
    private updateInvitationService: UpdateInvitationService;

    constructor() {
        super();
        this.signUpService = new SignUpService();
        this.createUserService = new CreateUserService();
        this.findInvitationService = new FindInvitationService();
        this.updateInvitationService = new UpdateInvitationService();
    }

    public signup(): any {
        return this.router.post("/", async (req, res) => {
            this.defaultErrData();
            const signupInputDto: SignUpInputDto = {
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                invitation: req.body.invitation
            }
            if (!this.checkInputDto(signupInputDto)) {
                const inputError = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_BAD_REQUEST,
                    message: 'Email, password and invitation are required'
                });
                return res.status(CODE_BAD_REQUEST).send(inputError);
            }
            const invitationValid = await this.checkInvitation(signupInputDto.invitation, signupInputDto.email);
            if (!invitationValid) {
                const invitationError = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_BAD_REQUEST,
                    message: 'Invitation is invalid'
                });
                return res.status(CODE_BAD_REQUEST).send(invitationError);
            }
            const signUpModel: SignUpModel = {
                emailVerified: false,
                disabled: false,
                email: signupInputDto.email,
                password: signupInputDto.password,
                phoneNumber: signupInputDto.phoneNumber
            }
            const data: any = await this.signUpService.signUp(signUpModel);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? this.getOutputDto(data) : ErrResponseService(this.err);
            if (this.err.statusCode === CODE_OK) await this.createUserService.createUser({
                uid: data.uid,
                email: data.email
            })
            if(this.err.statusCode === CODE_OK ) {
                const invitation: Invitation = {beenUsed: true};
                this.updateInvitationService.partialUpdateInvitation(invitation,signupInputDto.invitation).then();
            }
            return res.status(this.err.statusCode).send(resp);
        })
    }

    private checkInputDto(data: SignUpInputDto): boolean {
        if (!data.email) return false;
        if (!data.password) return false;
        return !!data.invitation;
    }

    private async checkInvitation(token: string, email: string) {
        const invitation: any = await this.findInvitationService.findInvitationByToken(token);
        if (invitation.err) return false;
        if (invitation.beenUsed) return false;
        if (invitation.guestEmail !== email) return false;
        return new Date() < invitation.availableUntil;
    }

    private getOutputDto(data): SignUpOutputDto {
        return {
            email: data.email,
            emailVerified: data.emailVerified,
            disabled: data.disabled,
            metadata: data.metadata,
            phoneNumber: data.phoneNumber,
            providerData: data.providerData,
            uid: data.uid,
            tokensValidAfterTime: data.tokensValidAfterTime
        };
    }
}