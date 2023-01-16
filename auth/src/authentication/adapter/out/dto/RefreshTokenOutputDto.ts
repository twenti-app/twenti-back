export interface RefreshTokenOutputDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}