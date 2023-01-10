import {FindByUserUidGenerateQrPort} from "../port/FindByUserUidGenerateQr-port";
import {GenerateQrModel} from "../../adapter/out/persistence/GenerateQr/GenerateQrModel";
import {CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND} from "../../../shared/enums/Errors";

export class FindByUserUidGenerateQrService implements FindByUserUidGenerateQrPort {
    async findByUserUid(userUid: string) {
        return GenerateQrModel.findOne({userUid}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with uid ' + userUid}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }

}