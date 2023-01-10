import {toDefinition} from "../../shared/stringUtils/ToDefinition";
import {logInInputDto, logInOutputDto, signUpInputDto, signUpOutputDto} from "./DefaultValues";

export const swaggerConfig = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Twenti auth swagger",
        "description": "Swagger for twenti auth microservice",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "host": "localhost:3000",
    "basePath": "/v0/auth",
    "tags": [
        {
            "name": "Authentication",
            "description": "Authentication endpoints"
        }
    ],
    "schemes": [
        "http",
        "https"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/signUp": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Signup with firebase",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Signup body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#definitions/signupInputDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/signupOutputDTO"
                        }
                    }
                }
            }
        },
        "/logIn": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "LogIn with firebase",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "LogIn body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#definitions/logInInputDto"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/logInOutputDTO"
                        }
                    }
                }
            }
        },
    },
    "definitions": {
        "signupInputDTO": {
            "type": "object",
            "properties": toDefinition(signUpInputDto)
        },
        "logInInputDto": {
            "type": "object",
            "properties": toDefinition(logInInputDto)
        },
        "signupOutputDTO": {
            "type": "object",
            "properties": toDefinition(signUpOutputDto)
        },
        "logInOutputDTO": {
            "type": "object",
            "properties": toDefinition(logInOutputDto)
        }
    },
    "components": {
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    },
    "securityDefinitions": {
        "bearerAuth": {
            "type": 'apiKey',
            "name": 'Authorization',
            "scheme": 'bearer',
            "in": 'header',
        },
    }
}