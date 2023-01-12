import {FindGenerateQrPort} from "../port/FindGenerateQr-port";
import {GenerateQrModel} from "../../adapter/out/persistence/GenerateQr/GenerateQrModel";
import {CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND} from "../../../shared/enums/Errors";

export class FindGenerateQrService implements FindGenerateQrPort {
    async findByUserUid(userUid: string) {
        return GenerateQrModel.findOne({userUid}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with uid ' + userUid}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }

    findByEmail(email: string) {
        return GenerateQrModel.findOne({email}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with email: ' + email}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }

}