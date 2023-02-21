import express from 'express';
import bodyParser from "body-parser";
import {firebaseConfig} from "./config/FirebaseConfig";
import {authenticationRoutes} from "./authentication/routes";
import {initMongo} from "./config/MongoConfig";
import swaggerUi from "swagger-ui-express";
import {swaggerConfig} from "./config/swagger/SwaggerConfig";
import {initEureka} from "./config/EurekaConfig";
import actuator, {Options} from "express-actuator";
import {userRoutes} from "./user/routes";

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

firebaseConfig();
initMongo();
initEureka('auth', PORT);
const options: Options = {
    basePath: '',
    infoGitMode: "simple",
    infoBuildOptions: null,
    infoDateFormat: null,
    customEndpoints: []
};

app.use(actuator(options));
app.use('/v0/auth', authenticationRoutes);
app.use('/v0/auth/user', userRoutes);
app.use('/v0/auth', swaggerUi.serve, swaggerUi.setup(swaggerConfig, null, null, null));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

process.on('uncaughtException', err => {
    console.log('Caught exception ', err);
})

process.on('unhandledRejection', (reason, promise) => {
    console.log(`Unhandled rejection at ${promise} reason: ${reason}`)
})


