"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agenda_1 = __importDefault(require("agenda"));
const config_1 = require("../../config");
function getAgendaInstance(connStr) {
    return new agenda_1.default({
        db: {
            address: connStr,
            collection: config_1.config.agenda.dbCollection
        },
        maxConcurrency: config_1.config.agenda.concurrency
    });
}
exports.getAgendaInstance = getAgendaInstance;
//# sourceMappingURL=agenda_loader.js.map