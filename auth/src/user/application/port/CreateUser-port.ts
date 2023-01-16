import {User} from "../../domain/User";

export interface CreateUserPort {
    createUser(user: User);
}