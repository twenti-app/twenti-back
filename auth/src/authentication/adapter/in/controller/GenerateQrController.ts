import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import {CODE_BAD_REQUEST, CODE_NOT_FOUND, CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {isOwnerEmail} from "../../../../shared/middleware/IsOwner";
import {GenerateQrOutputDto} from "../../out/dto/GenerateQrOutputDto";
import {SaveGenerateQrService} from "../../../application/service/SaveGenerateQr-service";
import {GenerateQrSimpleModel} from "../../../domain/GenerateQrSimpleModel";
import {FindGenerateQrService} from "../../../application/service/FindGenerateQr-service";

export class GenerateQrController extends DefaultController {

    private saveGenerateQrService: SaveGenerateQrService;
    private findByUserUidGenerateQr: FindGenerateQrService;

    constructor() {
        super();
        this.saveGenerateQrService = new SaveGenerateQrService();
        this.findByUserUidGenerateQr = new FindGenerateQrService();
    }

    public generateQr() {
        return this.router.get("/:email", isOwnerEmail, async (req, res) => {
            this.defaultErrData();
            const qr = await this.checkSavedData(req.params.email);
            if (qr) return res.status(this.err.statusCode).send(qr);
            const secret = this.getSecret(req.params.email);
            QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
                if (err || !dataUrl) {
                    const error = {err: {statusCode: CODE_BAD_REQUEST, message: err}};
                    this.setErrData(error);
                }
                const resp = this.err.statusCode === CODE_OK ? this.getOutputDto(dataUrl) : ErrResponseService(this.err);
                const savedDataQr: GenerateQrSimpleModel = {
                    ...this.getOutputDto(dataUrl),
                    email: req.params.email,
                    secret: secret.base32,
                }
                this.saveGenerateQrService.saveGenerateQr(savedDataQr);
                return res.status(this.err.statusCode).send(resp);
            });
        });
    }

    private async checkSavedData(email: string) {
        const qr: any = await this.findByUserUidGenerateQr.findByEmail(email);
        if (qr && qr?.err?.statusCode !== CODE_NOT_FOUND) {
            if (qr.err) this.setErrData(qr.err);
            return this.err.statusCode === CODE_OK ? this.getSavedDataDto(qr) : ErrResponseService(this.err);
        }
        return false;
    }

    private getSecret(email: string){
        return speakeasy.generateSecret({
            length: 20,
            name: `Twenti (${email})`,
            issuer: 'Twenti',
        });
    }
    private getOutputDto(data): GenerateQrOutputDto {
        const values = data.split(",");
        const info = values[0].split(';');
        const value = {
            extension: info[0].split("/")[1],
            base: info[1],
            data: values[1]
        }
        return this.getSavedDataDto(value);
    }

    private getSavedDataDto(value): GenerateQrOutputDto {
        return {
            extension: value.extension,
            base: value.base,
            data: value.data,
        }
    }
}