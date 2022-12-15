import {SignUpInputDto} from "../../authentication/adapter/in/dto/SignUpInputDto";
import {SignUpOutputDto} from "../../authentication/adapter/out/SignUpOutputDto";
import {Metadata} from "../../authentication/adapter/out/entities/Metadata";
import {ProviderData} from "../../authentication/adapter/out/entities/ProviderData";

export const signUpInputDto: SignUpInputDto = {
    email: '',
    invitation: '',
    password: '',
    phoneNumber: ''
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