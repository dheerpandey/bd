"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const index_1 = require("./index");
const header_constants_1 = require("../../ui/constants/header_constants");
const basePath = index_1.config.api.prefix;
const entryFile = "./src/index.ts";
const controllers = "./src/ui/api/controllers/*.ts";
const protocol = index_1.config.env === "development" || index_1.config.env === "test" ? "http" : "https";
exports.swaggerGen = () => __awaiter(void 0, void 0, void 0, function* () {
    const swaggerOptions = {
        basePath,
        entryFile,
        securityDefinitions: {
            [header_constants_1.X_TENANT_ID]: {
                type: "apiKey",
                in: "header",
                name: header_constants_1.X_TENANT_ID,
                description: "Tenant ID"
            },
            [header_constants_1.X_AUTH_TOKEN_KEY]: {
                type: "apiKey",
                in: "header",
                name: header_constants_1.X_AUTH_TOKEN_KEY,
                description: "JWT access token"
            }
        },
        noImplicitAdditionalProperties: "throw-on-extras",
        host: process.env.HOST,
        description: "Enterprise NodeJs/Typescript API boilerplate",
        version: "1.0.0",
        name: "node-typescript-boilerplate",
        specVersion: 3,
        schemes: [protocol],
        outputDirectory: "./",
        controllerPathGlobs: [controllers]
    };
    const routeOptions = {
        basePath,
        entryFile,
        middleware: "express",
        authenticationModule: "./src/ui/api/middleware/auth_middleware",
        iocModule: "./src/infrastructure/config/ioc",
        routesDir: "./src/ui/api",
        controllerPathGlobs: [controllers]
    };
    if (index_1.config.env !== "test")
        yield tsoa_1.generateSwaggerSpec(swaggerOptions, routeOptions);
    yield tsoa_1.generateRoutes(routeOptions, swaggerOptions);
});
//# sourceMappingURL=swagger.config.js.map