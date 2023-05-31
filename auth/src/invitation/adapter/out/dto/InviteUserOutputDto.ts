export interface InviteUserOutputDto {
    guestEmail: string;
    email: string;
    reason: string;
    availableUntil: Date;
    createdAt: Date;
    updatedAt: Date;
}