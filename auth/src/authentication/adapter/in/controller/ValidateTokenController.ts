import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {FindByUserUidGenerateQrService} from "../../../application/service/FindByUserUidGenerateQr-service";
import {CheckTokenInputDto} from "../dto/CheckTokenInputDto";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {CODE_BAD_REQUEST, CODE_OK} from "../../../../shared/enums/Errors";
import * as speakeasy from 'speakeasy';

export class ValidateTokenController extends DefaultController {
    private findByUserUidGenerateQr: FindByUserUidGenerateQrService;

    constructor() {
        super();
        this.findByUserUidGenerateQr = new FindByUserUidGenerateQrService();
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
            const data: any = await this.findByUserUidGenerateQr.findByUserUid(inputDto.uid);
            if (data.err) this.setErrData(data.err);
            const savedResp = this.err.statusCode === CODE_OK ? this.checkToken(data.secret, inputDto.token) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(savedResp);
        })
    }

    private checkToken(secret: string, token: string): boolean {
        return speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window:2
        });
    }

    private checkInputDto(inputDto: CheckTokenInputDto): boolean {
        if (!inputDto.uid) return true;
        return !inputDto.token;
    }
}