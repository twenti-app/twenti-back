export interface InviteUserOutputDto {
    guestEmail: string;
    email: string;
    reason: string;
    beenUsed:boolean;
    availableUntil: Date;
    createdAt: Date;
    updatedAt: Date;
}