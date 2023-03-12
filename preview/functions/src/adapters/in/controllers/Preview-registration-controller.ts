import {PreviewRegistrationService,} from "../../../application/services/Preview-registration-service";
import {PreviewRegistrationModel,} from "../../../models/Preview-registration-model";
import {DefaultController} from "../../../shared/DefaultController";

import {FindUserByEmailService,} from "../../../application/services/Find-user-by-email-service";
import {emailVerified} from "../../../shared/EmailVerified";
import {Request} from "firebase-functions/v1/https";
import {sendEmail} from "../../../config/EmailConfig";
import {PreviewRegistrationInputDto} from "../dtos/Preview-registration-input-dto";

export class PreviewRegistrationController extends DefaultController {
    private previewRegistrationRegistration: PreviewRegistrationService;

    private findUserByEmailService: FindUserByEmailService;

    readonly mainPlatformValues = ['mobile', 'web'];
    readonly availableLanguages = ['spanish', 'english', 'basque', 'catalan', 'hungarian']
    constructor() {
        super();
        this.previewRegistrationRegistration = new PreviewRegistrationService();
        this.findUserByEmailService = new FindUserByEmailService();
    }

    public async previewRegistration(request: Request, ip: string | string[] | undefined): Promise<any> {
        this.defaultErrData();
        const previewRegistrationInputDto: PreviewRegistrationInputDto = {
            email: request.body.email,
            name: request.body.name,
            reason: request.body.reason,
            mainPlatform: request.body.mainPlatform,
            language: request.body.language
        };
        if (!previewRegistrationInputDto.email) {
            this.setErrData({statusCode: 400, message: "Email is required"});
            return this.err;
        }
        if (!previewRegistrationInputDto.name) {
                    this.setErrData({statusCode: 400, message: "Name is required"});
                    return this.err;
        }
        if (!previewRegistrationInputDto.mainPlatform) {
                    this.setErrData({statusCode: 400, message: "Main platform is required"});
                    return this.err;
        }
        if (!emailVerified(previewRegistrationInputDto.email)) {
            this.setErrData({statusCode: 422, message: "Invalid email"});
            return this.err;
        }
        if (!this.mainPlatformValues.includes(previewRegistrationInputDto.mainPlatform.toLocaleLowerCase())) {
            this.setErrData({statusCode: 422, message: "Invalid main platform"});
            return this.err;
        }
        return this.findUserByEmailService
            .findUserByEmail(previewRegistrationInputDto.email).then((users: PreviewRegistrationModel[]) => {
                const user = users.find(u => u.email?.toLocaleLowerCase() === previewRegistrationInputDto.email?.toLocaleLowerCase());
                if (user) {
                    this.setErrData({
                        statusCode: 409,
                        message: "The user is already registered",
                    });
                    return this.err;
                }
                const model: PreviewRegistrationModel = {
                    email: previewRegistrationInputDto.email,
                    status: "Requested",
                    reason: previewRegistrationInputDto.reason,
                    name: previewRegistrationInputDto.name,
                    mainPlatform: previewRegistrationInputDto.mainPlatform,
                    language: this.availableLanguages.includes(previewRegistrationInputDto.language?.toLocaleLowerCase())
                                ? previewRegistrationInputDto.language : 'english',
                    requestedDate: new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                    ip: ip ?? "",
                };
                return this.previewRegistrationRegistration
                    .previewRegistration(model).then((response) => {
                        sendEmail(previewRegistrationInputDto.email, `You're on the waitlist`, 'PreviewEmail.html');
                        this.setErrData(response, response.statusCode === 200 ? "Success Request" : undefined);
                        return this.err;
                    });
            });
    }
}
