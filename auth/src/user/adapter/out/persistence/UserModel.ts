import {model} from "mongoose";
import {UserSchema} from "./UserSchema";

export const UserModel = model('User', UserSchema);