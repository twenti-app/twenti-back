export interface User {
    _id?: string;
    uid?: string;
    email?: string;
    isActive2fa?: boolean;
    availableInvitations?: number;
    consumedInvitations?: number;
    createdAt?: Date;
    updatedAt?: Date;
}