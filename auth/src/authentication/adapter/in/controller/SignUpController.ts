import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {SignUpInputDto} from "../dto/SignUpInputDto";
import {SignUpService} from "../../../application/service/SignUpService";
import {SignUpModel} from "../../../domain/SignUpModel";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {SignUpOutputDto} from "../../out/dto/SignUpOutputDto";
import {CreateUserService} from "../../../../user/application/service/CreateUser-service";


export class SignUpController extends DefaultController {
    private signUpService: SignUpService;
    private createUserService: CreateUserService;

    constructor() {
        super();
        this.signUpService = new SignUpService();
        this.createUserService = new CreateUserService();
    }

    public signup(): any {
        return this.router.post("/", async (req, res) => {
            this.defaultErrData();
            const signupInputDto: SignUpInputDto = req.body
            // TODO: Check if is valid
            const signUpModel: SignUpModel = {
                emailVerified: false,
                disbled: false,
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
            return res.status(this.err.statusCode).send(resp);
        })
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