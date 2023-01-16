import {Schema} from "mongoose";
import {User} from "./User";

export const UserSchema = new Schema<User>({
        availableInvitations: {type: Number, default: 0, min: 0, max: 10},
        consumedInvitations: {type: Number, default: 0, min: 0},
        isActive2fa: {type: Boolean, default: false},
        email: {type: String, required: true},
        uid: {type: String, required: true},
    },
    {
        timestamps: true
    }
);