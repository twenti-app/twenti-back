import {User} from "../../domain/User";

export interface UpdateUserPort {
    partialUpdateUser(user: User, uid:string);
}