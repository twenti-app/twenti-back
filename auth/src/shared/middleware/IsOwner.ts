import {ErrResponseService} from "../errors/ErrorService";
import {CODE_FORBIDDEN, CODE_INTERNAL_SERVER_ERROR, CODE_UNAUTHORIZED} from "../enums/Errors";
import {getAuth} from "firebase-admin/auth";

export function isOwner(req, res, next) {
    const bearer = req.headers.authorization;

    if (!bearer) {
        const resp = ErrResponseService({
            status: 'Failure Request',
            statusCode: CODE_FORBIDDEN,
            message: 'Unauthorized request'
        });
        return res.status(CODE_FORBIDDEN).send(resp);
    }
    const token = bearer.includes('bearer') ? bearer.split(' ')[1] : bearer;
    getAuth()
        .verifyIdToken(token, true)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            if (uid !== (req?.params?.uid ?? req?.body?.uid)) {
                const resp = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_UNAUTHORIZED,
                    message: 'Unauthorized request'
                });
                return res.status(CODE_UNAUTHORIZED).send(resp);
            }
            next();
        })
        .catch((error) => {
            const resp = ErrResponseService({
                status: 'Failure Request',
                statusCode: CODE_INTERNAL_SERVER_ERROR,
                message: error
            });
            return res.status(CODE_INTERNAL_SERVER_ERROR).send(resp);
        });
}

export function isOwnerEmail(req, res, next) {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const resp = ErrResponseService({
            status: 'Failure Request',
            statusCode: CODE_FORBIDDEN,
            message: 'Unauthorized request'
        });
        return res.status(CODE_FORBIDDEN).send(resp);
    }
    const token = bearer.includes('bearer') ? bearer.split(' ')[1] : bearer;
    getAuth()
        .verifyIdToken(token, true)
        .then((decodedToken) => {
            const email = decodedToken.email;
            if (email !== (req?.params?.email ?? req?.body?.email)) {
                const resp = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_UNAUTHORIZED,
                    message: 'Unauthorized request'
                });
                return res.status(CODE_UNAUTHORIZED).send(resp);
            }
            next();
        })
        .catch((error) => {
            const resp = ErrResponseService({
                status: 'Failure Request',
                statusCode: CODE_INTERNAL_SERVER_ERROR,
                message: error
            });
            return res.status(CODE_INTERNAL_SERVER_ERROR).send(resp);
        });
}