"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatch_1 = require("event-dispatch");
const inversify_1 = require("inversify");
// Interfaces & Types
const types_1 = require("../../core/domain/constants/types");
// Controllers
require("../../ui/api/controllers/auth_controller");
require("../../ui/api/controllers/tenant_controller");
const function_query_1 = require("../db/function_query");
exports.referenceDataIoCModule = new inversify_1.ContainerModule(bind => {
    bind(types_1.TYPES.EventDispatcher).toConstantValue(new event_dispatch_1.EventDispatcher());
    bind(types_1.TYPES.FunctionQuery).toConstantValue(new function_query_1.FunctionQuery());
});
//# sourceMappingURL=inversify.config.js.map