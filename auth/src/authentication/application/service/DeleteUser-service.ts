import {DeleteUserPort} from "../port/DeleteUser-port";
import {getAuth} from "firebase-admin/auth";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";

export class DeleteUserService implements DeleteUserPort{

    constructor() {
    }

    deleteUser(uid: string) {
        return getAuth()
            .deleteUser(uid)
            .then(() => {
                return 'Successfully deleted user';
            })
            .catch((error) => {
                return {err: {statusCode: CODE_BAD_REQUEST, message: error}};
            });
    }

}