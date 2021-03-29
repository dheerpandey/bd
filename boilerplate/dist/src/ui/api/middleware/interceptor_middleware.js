"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RequestMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const inversify_express_utils_1 = require("inversify-express-utils");
const config_1 = require("../../../infrastructure/config");
const ioc_1 = require("../../../infrastructure/config/ioc");
const error_1 = require("../../error");
let RequestMiddleware = RequestMiddleware_1 = class RequestMiddleware extends inversify_express_utils_1.BaseMiddleware {
    handler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const log = iocContainer.get<ILoggerService>(LoggerService);
            // log.info(`
            //     ----------------------------------
            //     REQUEST MIDDLEWARE
            //     HTTP ${req.method} ${req.url}
            //     ----------------------------------
            // `);
            next();
        });
    }
};
RequestMiddleware = RequestMiddleware_1 = __decorate([
    ioc_1.provideSingleton(RequestMiddleware_1)
], RequestMiddleware);
exports.RequestMiddleware = RequestMiddleware;
function exceptionLoggerMiddleware(error, req, res, next) {
    // const log = iocContainer.get<ILoggerService>(LoggerService);
    // log.error(`
    // ----------------------------------
    // EXCEPTION MIDDLEWARE
    // HTTP ${req.method} ${req.url}
    // ${error.message}
    // ----------------------------------
    // `);
    if (error instanceof error_1.HttpError) {
        //   sendHttpErrorModule(req, res, next);
        return res
            .status(error.status)
            .json(Object.assign(Object.assign({}, error), { message: error.message }));
    }
    error =
        config_1.config.env === "development" || config_1.config.env === "test"
            ? new error_1.HttpError(http_status_codes_1.default.INTERNAL_SERVER_ERROR, error.message)
            : new error_1.HttpError(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
    res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json(Object.assign(Object.assign({}, error), { message: error.message }));
}
exports.exceptionLoggerMiddleware = exceptionLoggerMiddleware;
//# sourceMappingURL=interceptor_middleware.js.map