export interface Invitation {
    _id?: string;
    guestEmail: string;
    email: string;
    reason: string;
    beenUsed:boolean;
    token: string;
    availableUntil?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}