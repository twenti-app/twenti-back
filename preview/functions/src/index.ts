import * as functions from "firebase-functions";
import * as express from "express";
import {initFirebaseModule} from "./config/FirebaseConfig";
import * as bodyParser from "body-parser";
import {PreviewRegistrationController} from "./adapters/in/controllers/Preview-registration-controller";
import * as cors from "cors";

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.urlencoded({extended: false, limit: "50mb"}));
server.use(bodyParser.json({limit: "50mb"}));
server.set("trust proxy", true);

initFirebaseModule();

const previewRegistrationController = new PreviewRegistrationController();

const availableRoutes = ["/v0/preview-registration"];
export const app = functions.https.onRequest(async (request, response) => {
    const corsHandler = cors({origin: true});
    corsHandler(request, response, async () => {
        if (request.method === "OPTIONS") return;
        const ipAddress = request.headers["x-forwarded-for"] || request.connection.remoteAddress;
        if (!request.path && !availableRoutes.includes(request.path)) {
            response.status(404).json({
                status: "Failure Request",
                statusCode: 404,
                message: "Not Found",
            });
            return;
        }
        if (request.path === "/v0/waitlist" && request.method === 'POST') {
            await previewRegistrationController.previewRegistration(request, ipAddress).then((res) => {
                response.status(res?.statusCode ?? 400).send(res);
                return;
            });
        }
    });
});
