import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {FindGenerateQrService} from "../../../application/service/FindGenerateQr-service";
import {CheckTokenInputDto} from "../dto/CheckTokenInputDto";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {CODE_BAD_REQUEST, CODE_FORBIDDEN, CODE_OK} from "../../../../shared/enums/Errors";
import * as speakeasy from 'speakeasy';
import {redisClient} from "../../../../config/RedisConfig";

export class ValidateTokenController extends DefaultController {
    private findByUserUidGenerateQr: FindGenerateQrService;

    constructor() {
        super();
        this.findByUserUidGenerateQr = new FindGenerateQrService();
    }

    public validateToken() {
        return this.router.post("/", async (req, res) => {
            this.defaultErrData();
            const inputDto: CheckTokenInputDto = req.body;
            if (this.checkInputDto(inputDto)) {
                const resp = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_BAD_REQUEST,
                    message: 'Uid and Token are required'
                });
                return res.status(CODE_BAD_REQUEST).send(resp);
            }
            const data: any = await this.findByUserUidGenerateQr.findByEmail(inputDto.email);
            if (data.err) this.setErrData(data.err);
            let savedResp: any = this.err.statusCode === CODE_OK ? this.checkToken(data.secret, inputDto.token) : ErrResponseService(this.err);
            if (this.err.statusCode === CODE_OK) {
                savedResp = savedResp ? await this.getOutputDto(inputDto.email) : this.getError();
            }
            return res.status(this.err.statusCode).send(savedResp);
        })
    }

    private getError() {
        const error = {
            statusCode: CODE_FORBIDDEN,
            message: 'Unauthorized request'
        };
        this.setErrData(error);
        return ErrResponseService(this.err);
    }

    private getOutputDto(email: string) {
        return redisClient.get(email).then(data => {
            if (!data) {
                const error = {statusCode: CODE_FORBIDDEN, message: 'Login is required'};
                this.setErrData(error);
                return ErrResponseService(this.err);
            }
            const value = JSON.parse(data);
            redisClient.del(email)
            return {
                email: value.email,
                emailVerified: value.emailVerified,
                stsTokenManager: value.stsTokenManager,
                uid: value.uid,
                phoneNumber: value.phoneNumber,
                providerData: value.providerData,
                displayName: value.displayName,
                photoURL: value.photoURL,
                createdAt: value.createdAt,
                isAnonymous: value.isAnonymous,
                lastLoginAt: value.lastLoginAt
            }
        });
    }

    private checkToken(secret: string, token: string): boolean {
        return speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window: 2
        });
    }

    private checkInputDto(inputDto: CheckTokenInputDto): boolean {
        if (!inputDto.email) return true;
        return !inputDto.token;
    }
}