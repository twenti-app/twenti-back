import {toDefinition} from "../../shared/stringUtils/ToDefinition";
import {
    checkTokenInputDto, faValue,
    generateQrOutputDto, inviteUserArrayOutputDto, inviteUserInputDto, inviteUserOutputDto,
    logInInputDto,
    logInOutputDto, refreshTokenOutputDTO,
    signUpInputDto,
    signUpOutputDto, userOutoutDto
} from "./DefaultValues";

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
        },
        {
            "name": "User",
            "description": "User endpoints"
        },
        {
            "name": "Invitation",
            "description": "Invitation endpoints"
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
        "/generate/{email}": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Generate QR",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "email",
                        "in": "path",
                        "description": "Email",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/GenerateQrOutputDTO"
                        }
                    }
                }
            }
        },
        "/validateToken": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Validate Token",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Validate token body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#definitions/checkTokenInputDto"
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
        "/refreshToken/{refreshToken}": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Refresh user token",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "refreshToken",
                        "in": "path",
                        "description": "RefreshToken",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/refreshTokenOutputDTO"
                        }
                    }
                }
            }
        },
        "/signOut/{uid}": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Sign out",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "uid",
                        "in": "path",
                        "description": "Uid",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/refreshTokenOutputDTO"
                        }
                    }
                }
            }
        },
        "/delete/{uid}": {
            "delete": {
                "tags": [
                    "User"
                ],
                "summary": "Delete user",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "uid",
                        "in": "path",
                        "description": "User uid",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok"
                    }
                }
            }
        },
        "/user/update2FA/{uid}": {
            "patch": {
                "tags": [
                    "User"
                ],
                "summary": "Update 2fa value of user",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "uid",
                        "in": "path",
                        "description": "Uid",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Value of 2fa",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#definitions/2faValue"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/userOutputDTO"
                        }
                    }
                }
            }
        },
        "/invitation/invite-user": {
            "post": {
                "tags": [
                    "Invitation"
                ],
                "summary": "Invite user",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Invite user body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#definitions/inviteUserInputDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/inviteUserOutputDTO"
                        }
                    }
                }
            }
        },
        "/invitation/find-by-token/{token}": {
            "get": {
                "tags": [
                    "Invitation"
                ],
                "summary": "Find invitation by Token",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "token",
                        "in": "path",
                        "description": "Token",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/inviteUserOutputDTO"
                        }
                    }
                }
            }
        },
        "/invitation/find-by-email/{email}": {
            "get": {
                "tags": [
                    "Invitation"
                ],
                "summary": "Find invitation by email",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "email",
                        "in": "path",
                        "description": "Email",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/inviteUserArrayOutputDTO"
                        }
                    }
                }
            }
        }
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
        },
        "GenerateQrOutputDTO": {
            "type": "object",
            "properties": toDefinition(generateQrOutputDto)
        },
        "checkTokenInputDto": {
            "type": "object",
            "properties": toDefinition(checkTokenInputDto)
        },
        "refreshTokenOutputDTO": {
            "type": "object",
            "properties": toDefinition(refreshTokenOutputDTO)
        },
        "2faValue": {
            "type": "object",
            "properties": toDefinition(faValue)
        },
        "userOutputDTO": {
            "type": "object",
            "properties": toDefinition(userOutoutDto)
        },
        "inviteUserInputDTO": {
            "type": "object",
            "properties": toDefinition(inviteUserInputDto)
        },
        "inviteUserOutputDTO": {
            "type": "object",
            "properties": toDefinition(inviteUserOutputDto)
        },
        "inviteUserArrayOutputDTO": {
            "type": "object",
            "properties": toDefinition(inviteUserArrayOutputDto)
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