import * as nodemailer from 'nodemailer';
import {email, password} from "../../../../keys/development/EmailConfig";

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: password
    }
});