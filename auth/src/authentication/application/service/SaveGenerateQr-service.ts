import {SaveGenerateQrPort} from "../port/SaveGenerateQr-port";
import {GenerateQrSimpleModel} from "../../domain/GenerateQrSimpleModel";
import {GenerateQrModel} from "../../adapter/out/persistence/GenerateQr/GenerateQrModel";
import {CODE_INTERNAL_SERVER_ERROR} from "../../../shared/enums/Errors";

export class SaveGenerateQrService implements SaveGenerateQrPort {
    saveGenerateQr(data: GenerateQrSimpleModel) {
        const savedData = new GenerateQrModel(data);
        return savedData.save()
            .then(r => {
                return r;
            }).catch((error) => {
                return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}}
            });
    }

}