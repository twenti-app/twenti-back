import {Schema} from "mongoose";
import {GenerateQr} from "./GenerateQr";

export const generateQrSchema = new Schema<GenerateQr>({
        email: {type: String, required: true},
        base: {type: String, required: true},
        data: {type: String, required: true},
        extension: {type: String, required: true},
        secret: {type: String, required: true},
    },
    {
        timestamps: true
    }
);