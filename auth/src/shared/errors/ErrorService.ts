import {CYAN_LOG, GREEN_LOG, RED_LOG, YELLOW_LOG} from "../enums/Errors";
import {clean} from "../objectUtils/Clean";
import {SharedResponse} from "./SharedResponse";

export function ErrResponseService(err): SharedResponse<any> {
    return clean({status: err.status, code: err.statusCode, message: err.message});
}

export const LogSuccess = (msg) => {
    console.log(GREEN_LOG, msg);
}
export const LogInfo = (msg) => {
    console.log(CYAN_LOG, msg);
}
export const LogWarning = (msg) => {
    console.log(YELLOW_LOG, msg);
}
export const LogDanger = (msg) => {
    console.log(RED_LOG, msg);
}