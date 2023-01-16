import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {CODE_BAD_REQUEST, CODE_OK} from "../../../../shared/enums/Errors";
import {RefreshTokenService} from "../../../application/service/RefreshToken-service";
import {RefreshTokenOutputDto} from "../../out/dto/RefreshTokenOutputDto";

export class RefreshTokenController extends DefaultController {
    private refreshTokenController: RefreshTokenService;

    constructor() {
        super();
        this.refreshTokenController = new RefreshTokenService();
    }

    public refreshToken() {
        return this.router.get('/:refreshToken', async (req, res) => {
            this.defaultErrData();
            const refreshToken = req.params.refreshToken;

            if (!refreshToken) {
                const resp = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_BAD_REQUEST,
                    message: 'Refresh token is required'
                });
                return res.status(this.err.statusCode).send(resp);
            }
            const data = await this.refreshTokenController.refreshToken(refreshToken) as any;
            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? this.getOutputDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        })
    }

    private getOutputDto(values): RefreshTokenOutputDto {
        return {
            accessToken: values.access_token,
            refreshToken: values.refresh_token,
            expiresIn: values.expires_in
        }
    }
}