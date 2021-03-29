"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("./types");
exports.dbClient = inversify_1.inject(types_1.TYPES.DbClient);
exports.eventDispatcher = inversify_1.inject(types_1.TYPES.EventDispatcher);
//# sourceMappingURL=decorators.js.map