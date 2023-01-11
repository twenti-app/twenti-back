import {FindUserPort} from "../port/FindUser-port";
import {CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND} from "../../../shared/enums/Errors";
import {UserModel} from "../../adapter/out/persistence/UserModel";

export class FindUserService implements FindUserPort {
    findUserByEmail(email: string) {
        return UserModel.findOne({email}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with email ' + email}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }

}