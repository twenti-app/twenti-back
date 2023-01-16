import express, {Router} from "express";
import {CODE_OK} from "../enums/Errors";

export class DefaultController {
    protected router: Router;
    protected err: { status: string, statusCode: number, message: string };

    constructor() {
        this.router = express.Router();
    }

    protected setErrData(dataErr: any, status: string = 'Failure Request') {
        this.err = {
            status: status,
            statusCode: dataErr.statusCode,
            message: dataErr.message
        };
    }

    protected defaultErrData() {
        this.err = {
            status: 'Success Request',
            statusCode: CODE_OK,
            message: ''
        }
    }
}