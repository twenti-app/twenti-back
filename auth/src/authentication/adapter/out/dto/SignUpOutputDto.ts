import {Metadata} from "./entities/Metadata";
import {ProviderData} from "./entities/ProviderData";

export interface SignUpOutputDto {
    uid: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    disabled: boolean;
    metadata: Metadata;
    tokensValidAfterTime: Date;
    providerData: ProviderData[];
}