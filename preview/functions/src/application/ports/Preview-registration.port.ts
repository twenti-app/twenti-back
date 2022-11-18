import {PreviewRegistrationModel} from "../../models/Preview-registration-model";

export interface PreviewRegistrationPort {
    previewRegistration(data: PreviewRegistrationModel): any;
}
