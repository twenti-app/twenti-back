import {CreateUserPort} from "../port/CreateUser-port";
import {User} from "../../domain/User";
import {UserModel} from "../../adapter/out/persistence/UserModel";
import {CODE_INTERNAL_SERVER_ERROR} from "../../../shared/enums/Errors";

export class CreateUserService implements CreateUserPort {
    createUser(user: User) {
        const savedData = new UserModel(user);
        return savedData.save()
            .then(r => {
                return r;
            }).catch((error) => {
                return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}}
            });
    }

}