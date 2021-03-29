"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const types_1 = require("../../core/domain/constants/types");
const logger_1 = require("../bootstrapping/loaders/logger");
const config_1 = require("../config");
const ioc_1 = require("../config/ioc");
function exitProcess(error) {
    logger_1.winstonLoggerInstance.error(`❌  ${error}`);
    process.exit(1);
}
exports.exitProcess = exitProcess;
function startAppServer(app, serverPort) {
    const port = serverPort || config_1.config.port;
    return app.listen(port, (error) => {
        if (error)
            exitProcess(error);
        ioc_1.iocContainer.bind(types_1.TYPES.App).toConstantValue(app);
    });
}
exports.startAppServer = startAppServer;
function isIdValid(id) {
    return mongoose_1.Types.ObjectId.isValid(id);
}
exports.isIdValid = isIdValid;
//# sourceMappingURL=server_utils.js.map