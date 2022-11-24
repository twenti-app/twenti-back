import express from 'express';
import bodyParser from "body-parser";
import {initFirebase} from "./config/InitFirebase";
import {authenticationRoutes} from "./authentication/routes";

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

initFirebase();

app.use('/v0/auth', authenticationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

process.on('uncaughtException', err => {
    console.log('Caught exception ', err);
})

process.on('unhandledRejection', (reason, promise) => {
    console.log(`Unhandled rejection at ${promise} reason: ${reason}`)
})


