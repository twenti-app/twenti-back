import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import {CODE_BAD_REQUEST, CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {isOwner} from "../../../../shared/middleware/IsOwner";
import {GenerateQrOutputDto} from "../../out/dto/GenerateQrOutputDto";
import {SaveGenerateQrService} from "../../../application/service/SaveGenerateQr-service";
import {GenerateQrSimpleModel} from "../../../domain/GenerateQrSimpleModel";

export class GenerateQrController extends DefaultController {

    private saveGenerateQrService: SaveGenerateQrService;

    constructor() {
        super();
        this.saveGenerateQrService = new SaveGenerateQrService();
    }

    public generateQr() {
        return this.router.get("/:uid", isOwner, async (req, res) => {
            this.defaultErrData();
            const secret = speakeasy.generateSecret({name: 'twneti'});
            QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
                if (err || !dataUrl) {
                    const error = {err: {statusCode: CODE_BAD_REQUEST, message: err}};
                    this.setErrData(error);
                }
                const resp = this.err.statusCode === CODE_OK ? this.getOutputDto(dataUrl) : ErrResponseService(this.err);
                const savedData: GenerateQrSimpleModel = {
                    ...this.getOutputDto(dataUrl),
                    userUid: req.params.uid,
                    secret: secret.base32,
                }
                this.saveGenerateQrService.saveGenerateQr(savedData)
                return res.status(this.err.statusCode).send(resp);
            });
        });
    }

    private getOutputDto(data): GenerateQrOutputDto {
        const values = data.split(",");
        const info = values[0].split(';');
        return {
            extension: info[0].split("/")[1],
            base: info[1],
            data: values[1]
        }
    }
}