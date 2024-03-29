import {Types} from "mongoose";

export interface Invitation {
    _id?: Types.ObjectId;
    guestEmail: string;
    email: string;
    reason?: string;
    beenUsed:boolean;
    token:string;
    availableUntil?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}