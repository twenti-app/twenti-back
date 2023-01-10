import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import {CODE_BAD_REQUEST, CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {isOwner} from "../../../../shared/middleware/IsOwner";

export class GenerateQrController extends DefaultController {

    constructor() {
        super();
    }

    public generateQr() {
        return this.router.get("/", isOwner, async (req, res) => {
            this.defaultErrData();
            const secret = speakeasy.generateSecret({name: 'twneti'});
            QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
                if (err || !dataUrl) {
                    const error = {err: {statusCode: CODE_BAD_REQUEST, message: err}};
                    this.setErrData(error);
                }
                const resp = this.err.statusCode === CODE_OK ? {
                    secret: secret.base32,
                    qrCode: dataUrl
                } : ErrResponseService(this.err);
                return res.status(this.err.statusCode).send(resp);
            });
        });
    }
}