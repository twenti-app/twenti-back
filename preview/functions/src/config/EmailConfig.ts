import * as nodemailer from 'nodemailer';
import {email, password} from "../../../../keys/development/EmailConfig";
import * as util from 'util';
import * as fs from 'fs';
import * as handlebars from "handlebars";
import * as path from 'path';

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: password
    }
});

export const sendEmail = async (emailTo: string, subject: string, filePath: string) => {
    const readFile = util.promisify(fs.readFile);
    const relativePath = path.resolve("src", "views", filePath);
    const html = await readFile(relativePath, 'utf8');
    const template = handlebars.compile(html);
    const data = {
        email: emailTo
    };
    const htmlToSend = template(data);
    const mailOptions = {
        from: email,
        to: emailTo,
        subject: subject,
        html: htmlToSend
    };

    return transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return error;
        }
        return false;
    });
};
