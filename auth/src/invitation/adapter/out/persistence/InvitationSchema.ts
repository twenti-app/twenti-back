import {Schema} from "mongoose";
import {Invitation} from "./Invitation";

export const InvitationSchema = new Schema<Invitation>({
        guestEmail: {type: String, required: true},
        email: {type: String, required: true},
        reason: {type: String, default: '', immutable: false},
        beenUsed: {type: Boolean, default: false, immutable: false},
        availableUntil: {type: Date, default: new Date().setMonth(new Date().getMonth() +1)}
    },
    {
        timestamps: true
    }
);