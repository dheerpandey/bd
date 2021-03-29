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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_express_utils_1 = require("inversify-express-utils");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const tsoa_1 = require("tsoa");
const swagger_json_1 = __importDefault(require("../../../swagger.json"));
const types_1 = require("../../core/domain/constants/types");
const interceptor_middleware_1 = require("../../ui/api/middleware/interceptor_middleware");
const routes_1 = require("../../ui/api/routes");
const config_1 = require("../config");
const swagger_config_1 = require("../config/swagger.config");
const db_client_1 = require("../db/db_client");
const agenda_loader_1 = require("./loaders/agenda_loader");
require("./loaders/events");
const express_1 = require("./loaders/express");
const jobs_1 = require("./loaders/jobs");
const logger_1 = require("./loaders/logger");
function bootstrap({ iocContainer, connStr, containerModules = [] }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (iocContainer.isBound(types_1.TYPES.App) === true)
            return iocContainer.get(types_1.TYPES.App);
        // iocContainer.applyMiddleware(makeLoggerMiddleware());
        const dbClient = yield db_client_1.getDatabaseClient(connStr);
        iocContainer.bind(types_1.TYPES.DbClient).toConstantValue(dbClient);
        iocContainer
            .bind(types_1.TYPES.Agenda)
            .toConstantValue(agenda_loader_1.getAgendaInstance(connStr));
        iocContainer.load(...containerModules);
        inversify_1.decorate(inversify_1.injectable(), tsoa_1.Controller);
        iocContainer.load(inversify_binding_decorators_1.buildProviderModule());
        logger_1.winstonLoggerInstance.info("✔️  Dependency Injector loaded");
        yield seedDb();
        jobs_1.Jobs.forEach((job) => __awaiter(this, void 0, void 0, function* () { return job(iocContainer.get(types_1.TYPES.Agenda)); }));
        logger_1.winstonLoggerInstance.info("✔️  Jobs loaded");
        // Configure express server using inversify IoC
        const server = new inversify_express_utils_1.InversifyExpressServer(iocContainer, null, null, null, null, false);
        server.setConfig((app) => express_1.expressLoader(app));
        logger_1.winstonLoggerInstance.info("✔️  Express loaded");
        server.setErrorConfig(app => {
            // Catch and log all exceptions
            app.use(interceptor_middleware_1.exceptionLoggerMiddleware);
        });
        const app = server.build();
        yield setupSwagger(app);
        logger_1.winstonLoggerInstance.info(`✔️  Environment: ${config_1.config.env}`);
        return app;
    });
}
exports.bootstrap = bootstrap;
function setupSwagger(app) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.winstonLoggerInstance.info("✔️  Generating routes...");
        routes_1.RegisterRoutes(app);
        logger_1.winstonLoggerInstance.info("✔️  Generating swagger doc...");
        yield swagger_config_1.swaggerGen();
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    });
}
function seedDb() {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.winstonLoggerInstance.info("✔️  Seeding DB...");
        const tenant = yield db_client_1.seedDefaultTenant();
        yield db_client_1.seedDefaultAdmin(tenant);
    });
}
//# sourceMappingURL=index.js.map