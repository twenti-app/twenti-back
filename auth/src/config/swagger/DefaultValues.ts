import {SignUpInputDto} from "../../authentication/adapter/in/dto/SignUpInputDto";
import {SignUpOutputDto} from "../../authentication/adapter/out/dto/SignUpOutputDto";
import {Metadata} from "../../authentication/adapter/out/dto/entities/Metadata";
import {ProviderData} from "../../authentication/adapter/out/dto/entities/ProviderData";
import {LogInInputDto} from "../../authentication/adapter/in/dto/LogInInputDto";
import {LogInOutputDto} from "../../authentication/adapter/out/dto/LogInOutputDto";
import {TokenManager} from "../../authentication/adapter/out/dto/entities/TokenManager";
import {GenerateQrOutputDto} from "../../authentication/adapter/out/dto/GenerateQrOutputDto";
import {CheckTokenInputDto} from "../../authentication/adapter/in/dto/CheckTokenInputDto";
import {RefreshTokenOutputDto} from "../../authentication/adapter/out/dto/RefreshTokenOutputDto";
import {UserOutputDto} from "../../user/adapter/out/dto/UserOutputDto";
import {InviteUserInputDto} from "../../invitation/adapter/in/dto/InviteUserInputDto";
import {InviteUserOutputDto} from "../../invitation/adapter/out/dto/InviteUserOutputDto";

export const signUpInputDto: SignUpInputDto = {
    email: '',
    invitation: '',
    password: '',
    phoneNumber: ''
}

export const logInInputDto: LogInInputDto = {
    email: '',
    password: ''
}

const defaultMetadata: Metadata = {
    creationTime: new Date(),
    lastRefreshTime: new Date(),
    lastSignInTime: new Date()
}

const providerData: ProviderData = {
    uid: '',
    phoneNumber: '',
    providerIn: '',
    displayName: '',
    photoURL: ''
}

const defaultStsTokenManager: TokenManager = {
    accessToken: '',
    refreshToken: '',
    expirationTime: new Date()
}
export const signUpOutputDto: SignUpOutputDto = {
    email: '',
    phoneNumber: '',
    disabled: false,
    emailVerified: false,
    uid: '',
    tokensValidAfterTime: new Date(),
    metadata: defaultMetadata,
    providerData: [providerData],
}

export const logInOutputDto: LogInOutputDto = {
    uid: '',
    phoneNumber: '',
    displayName: '',
    photoURL: '',
    email: '',
    emailVerified: false,
    createdAt: new Date(),
    providerData,
    isAnonymous: false,
    lastLoginAt: new Date(),
    stsTokenManager: defaultStsTokenManager
}

export const generateQrOutputDto: GenerateQrOutputDto = {
    base: '',
    data: '',
    extension: ''
}

export const checkTokenInputDto: CheckTokenInputDto = {
    email: '',
    token: ''
}

export const refreshTokenOutputDTO: RefreshTokenOutputDto = {
    accessToken: '',
    refreshToken: '',
    expiresIn: 0
}

export const faValue = {
    isActive2fa: false
}

export const userOutoutDto: UserOutputDto = {
    email: '',
    uid: '',
    consumedInvitations: 0,
    availableInvitations: 0,
    isActive2fa: false
}

export const inviteUserInputDto: InviteUserInputDto = {
    guestEmail:'',
    email: '',
    reason: ''
}

export const inviteUserOutputDto :InviteUserOutputDto = {
    email: '',
    reason: '',
    createdAt: new Date(),
    guestEmail: '',
    updatedAt: new Date(),
    availableUntil: new Date(),
    beenUsed: false,
    token: ''
}

export const inviteUserArrayOutputDto :InviteUserOutputDto[] =[
    {
    email: '',
    reason: '',
    createdAt: new Date(),
    guestEmail: '',
    updatedAt: new Date(),
    availableUntil: new Date(),
    beenUsed: false,
    token: ''
    }
    ]