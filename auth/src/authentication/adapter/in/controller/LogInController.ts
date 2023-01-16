import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {LoginService} from "../../../application/service/Login-service";
import {LogInInputDto} from "../dto/LogInInputDto";
import {LogInModel} from "../../../domain/LogInModel";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {CODE_BAD_REQUEST, CODE_FORBIDDEN, CODE_OK} from "../../../../shared/enums/Errors";
import {LogInOutputDto} from "../../out/dto/LogInOutputDto";
import {FindUserService} from "../../../../user/application/service/FindUser-service";
import {CreateUserService} from "../../../../user/application/service/CreateUser-service";
import {redisClient} from "../../../../config/RedisConfig";

export class LogInController extends DefaultController {
    private loginService: LoginService;
    private findUserService: FindUserService;
    private createUserService: CreateUserService;

    constructor() {
        super();
        this.loginService = new LoginService();
        this.findUserService = new FindUserService();
        this.createUserService = new CreateUserService();
    }

    public logIn() {
        return this.router.post('/', async (req, res) => {
            this.defaultErrData();
            const logInInputDto: LogInInputDto = req.body;
            if (this.checkInputDto(logInInputDto)) {
                const resp = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_BAD_REQUEST,
                    message: 'Email and Password are required'
                });
                return res.status(CODE_BAD_REQUEST).send(resp);
            }
            const user: LogInModel = {
                email: logInInputDto.email,
                password: logInInputDto.password
            };

            const data: any = await this.loginService.login(user);
            if (data.err) this.setErrData(data.err);
            let resp = this.err.statusCode === CODE_OK ? this.getOutputDto(data.user) : ErrResponseService(this.err);
            const userData: any = await this.findUserService.findUserByEmail(user.email);
            if (this.checkUserData(userData, data?.user)) {
                this.setErrData({statusCode: CODE_FORBIDDEN, message: '2FA is active'});
                resp = ErrResponseService(this.err);
                redisClient.setnx(userData.email, JSON.stringify(data?.user));
                redisClient.expire(userData.email, 120);
            }
            return res.status(this.err.statusCode).send(resp);
        });
    }

    private checkUserData(userData, user) {
        if (userData.err && user) {
            this.createUserService.createUser({uid: user.uid, email: user.email}).then();
            return false;
        }
        return userData.isActive2fa;
    }

    private getOutputDto(data): LogInOutputDto {
        return {
            email: data.email,
            emailVerified: data.emailVerified,
            stsTokenManager: data.stsTokenManager,
            uid: data.uid,
            phoneNumber: data.phoneNumber,
            providerData: data.providerData,
            displayName: data.displayName,
            photoURL: data.photoURL,
            createdAt: data.createdAt,
            isAnonymous: data.isAnonymous,
            lastLoginAt: data.lastLoginAt
        }
    }

    private checkInputDto(inputDto: LogInInputDto): boolean {
        if (!inputDto.email) return true;
        return !inputDto.password;

    }
}