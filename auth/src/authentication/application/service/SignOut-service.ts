import {SignOutPort} from "../port/SignOut-port";
import {getAuth} from "firebase-admin/auth";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";

export class SignOutService implements SignOutPort {
    signOut(uid: string) {
        return getAuth()
            .revokeRefreshTokens(uid)
            .then(() => {
                return true;
            })
            .catch((error) => {
                return {err: {statusCode: CODE_BAD_REQUEST, message: error}}
            });
    }

}