import {Types} from "mongoose";

export interface User {
    _uid: Types.ObjectId;
    uid?: string;
    email: string;
    isActive2fa: boolean;
    availableInvitations: number;
    consumedInvitations: number;
    createdAt: Date;
    updatedAt: Date;
}