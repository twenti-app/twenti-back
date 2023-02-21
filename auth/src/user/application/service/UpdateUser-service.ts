import {UpdateUserPort} from "../port/UpdateUser-port";
import {User} from "../../domain/User";
import {UserModel} from "../../adapter/out/persistence/UserModel";
import {clean} from "../../../shared/objectUtils/Clean";
import {CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND} from "../../../shared/enums/Errors";

export class UpdateUserService implements UpdateUserPort {
    partialUpdateUser(user: User, uid: string) {
        return UserModel.findOneAndUpdate({uid}, clean(user), {new: true}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with uid ' + uid}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }
}