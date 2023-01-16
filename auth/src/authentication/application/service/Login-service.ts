import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {LoginPort} from "../port/Login-port";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";
import {LogInModel} from "../../domain/LogInModel";

export class LoginService implements LoginPort {

    private auth;

    constructor() {
    }

    login(user: LogInModel) {
        if (!this.auth) this.auth = getAuth();
        return signInWithEmailAndPassword(this.auth, user.email, user.password)
            .then((resp) => {
                return resp;
            })
            .catch((error) => {
                return {err: {statusCode: CODE_BAD_REQUEST, message: error}}
            });
    }
}