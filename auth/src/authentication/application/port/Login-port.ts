import {LogInModel} from "../../domain/LogInModel";

export interface LoginPort {
    login(user: LogInModel);
}