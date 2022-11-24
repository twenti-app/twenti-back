import {SignUpPort} from "../port/SignUpPort";
import {SignUpModel} from "../../domain/SignUpModel";
import {getAuth} from "firebase-admin/auth";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";

export class SignUpService implements SignUpPort {

    signUp(data: SignUpModel) {
        return getAuth()
            .createUser(data)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {statusCode: CODE_BAD_REQUEST, message: error}}
            });
    }
}