import * as functions from "firebase-functions";
import * as express from "express";
import {initFirebaseModule} from "./config/FirebaseConfig";
import * as bodyParser from "body-parser";
import {PreviewRegistrationController} from "./adapters/in/controllers/Preview-registration-controller";

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.urlencoded({extended: false, limit: "50mb"}));
server.use(bodyParser.json({limit: "50mb"}));
server.set("trust proxy", true);

initFirebaseModule("twenti-preview");

const previewRegistrationController = new PreviewRegistrationController();

export const app = functions.https.onRequest(async (request, response) => {
    const cors = await import("cors");
    const corsHandler = cors({origin: true});
    corsHandler(request, response, () => {
    });
    if (request.method === "OPTIONS") return;
    const ipAddress = request.headers["x-forwarded-for"] || request.connection.remoteAddress;
    if (!request.path) {
        response.status(404).json({
            status: "Failure Request",
            statusCode: 404,
            message: "Not Found",
        });
        return;
    }
    if (request.path === "/v0/preview-registration") {
        await previewRegistrationController.previewRegistration(request, ipAddress).then((res) => {
            response.status(res.statusCode).send(res);
            return;
        });
    }
});
