export interface TokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: Date;
}