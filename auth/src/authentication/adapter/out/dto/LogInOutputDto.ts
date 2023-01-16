import {ProviderData} from "./entities/ProviderData";
import {TokenManager} from "./entities/TokenManager";

export interface LogInOutputDto {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: ProviderData;
    createdAt: Date;
    lastLoginAt: Date;
    stsTokenManager: TokenManager;
}