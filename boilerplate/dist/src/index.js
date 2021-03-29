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
require("reflect-metadata");
const bootstrapping_1 = require("./infrastructure/bootstrapping");
const logger_1 = require("./infrastructure/bootstrapping/loaders/logger");
const config_1 = require("./infrastructure/config");
const inversify_config_1 = require("./infrastructure/config/inversify.config");
const ioc_1 = require("./infrastructure/config/ioc");
const server_utils_1 = require("./infrastructure/utils/server_utils");
function startServer(connStr, port) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = yield bootstrapping_1.bootstrap({
                iocContainer: ioc_1.iocContainer,
                connStr,
                containerModules: [inversify_config_1.referenceDataIoCModule]
            });
            server_utils_1.startAppServer(app, port);
            logger_1.winstonLoggerInstance.info(`✔️  Server listening on port: ${port}\n`);
        }
        catch (error) {
            server_utils_1.exitProcess(error);
            throw error;
        }
    });
}
exports.startServer = startServer;
startServer(config_1.config.mongoDbConnection, config_1.config.port);
//# sourceMappingURL=index.js.map