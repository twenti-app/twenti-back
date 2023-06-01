export interface FindInvitationPort {
    findInvitationByToken(token: string);

    findInvitationByEmail(email: string);
}