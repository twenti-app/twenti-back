import {Types} from "mongoose";

export interface GenerateQr {
    _id: Types.ObjectId,
    userUid: string,
    base: string,
    extension: string,
    data: string
    secret:string;
}