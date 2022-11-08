const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get('/' , (request, response) => {
    response.send("Hello word");
})

exports.app = functions.https.onRequest(app);
