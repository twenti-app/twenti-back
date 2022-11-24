import {SignUpModel} from "../../domain/SignUpModel";

export interface SignUpPort {
    signUp(data: SignUpModel);
}