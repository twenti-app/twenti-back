import {RefreshTokenPort} from "../port/RefreshToken-port";
import axios from "axios";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";
import {apiKey} from "../../../../../keys/development/firebaseKeys";

export class RefreshTokenService implements RefreshTokenPort {

    refreshToken(token: string) {
        return axios({
            method: 'post',
            url: 'https://securetoken.googleapis.com/v1/token?key=' + apiKey,
            data: {
                grant_type: 'refresh_token',
                refresh_token: token
            }
        }).then(res => {
            return res.data;
        }).catch(error => {
            return {err: {statusCode: CODE_BAD_REQUEST, message: error}}
        });
    }

}