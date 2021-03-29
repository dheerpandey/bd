"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../bootstrapping/loaders/logger");
const ioc_1 = require("../config/ioc");
let LoggerService = LoggerService_1 = class LoggerService {
    constructor() {
        this._loggerInstance = logger_1.winstonLoggerInstance;
    }
    silly(message, meta) {
        this._loggerInstance.silly(message, meta);
    }
    error(message, meta) {
        this._loggerInstance.error(message, meta);
    }
    info(message, meta) {
        this._loggerInstance.info(message, meta);
    }
    debug(message, meta) {
        this._loggerInstance.debug(message, meta);
    }
    warn(message, meta) {
        this._loggerInstance.warn(message, meta);
    }
};
LoggerService = LoggerService_1 = __decorate([
    ioc_1.provideSingleton(LoggerService_1)
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger_service.js.map