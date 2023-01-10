import {model} from "mongoose";
import {generateQrSchema} from "./GenerateQrSchema";

export const GenerateQrModel = model('GenerateQr', generateQrSchema);