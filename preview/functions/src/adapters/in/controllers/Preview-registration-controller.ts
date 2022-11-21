import {PreviewRegistrationService,} from "../../../application/services/Preview-registration-service";
import {PreviewRegistrationModel,} from "../../../models/Preview-registration-model";
import {DefaultController} from "../../../shared/DefaultController";

import {FindUserByEmailService,} from "../../../application/services/Find-user-by-email-service";
import {emailVerified} from "../../../shared/EmailVerified";
import {Request} from "firebase-functions/v1/https";
import {transporter} from "../../../config/EmailConfig";

export class PreviewRegistrationController extends DefaultController {
    private previewRegistrationRegistration: PreviewRegistrationService;

    private findUserByEmailService: FindUserByEmailService;

    constructor() {
        super();
        this.previewRegistrationRegistration = new PreviewRegistrationService();
        this.findUserByEmailService = new FindUserByEmailService();
    }

    public async previewRegistration(request: Request, ip: string | string[] | undefined): Promise<any> {
        this.defaultErrData();
        const userEmail: string = request.body?.email;
        if (!userEmail) {
            this.setErrData({statusCode: 400, message: "Email is required"});
            return this.err;
        }
        if (!emailVerified(userEmail)) {
            this.setErrData({statusCode: 422, message: "Invalid email"});
            return this.err;
        }
        return this.findUserByEmailService
            .findUserByEmail(userEmail).then((users: PreviewRegistrationModel[]) => {
                const user = users.find(u => u.email === userEmail);
                if (user) {
                    this.setErrData({
                        statusCode: 409,
                        message: "The user is already registered",
                    });
                    return this.err;
                }
                const model: PreviewRegistrationModel = {
                    email: userEmail,
                    status: "Requested",
                    requestedDate: new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                    ip: ip ?? "",
                };
                return this.previewRegistrationRegistration
                    .previewRegistration(model).then((response) => {
                        this.sendEmail(userEmail);
                        this.setErrData(response, response.statusCode === 200 ? "Success Request" : undefined);
                        return this.err;
                    });
            });
    }

    private sendEmail(email: string) {
        const mailOptions = {
            from: `softauthor1@gmail.com`,
            to: email,
            subject: 'contact form message',
            html: `<h1>Order Confirmation</h1>
                    <p> <b>Email: </b>$email} </p>`
        };

        return transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return error;
            }
            return false;
        });
    }
}
