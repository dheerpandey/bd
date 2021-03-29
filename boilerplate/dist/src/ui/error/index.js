"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
/**
 * @export
 * @class HttpError
 * @extends {Error}
 */
class HttpError extends Error {
    constructor(status, message, name) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
        this.name = name || this.name;
        this.message =
            message ||
                http_1.default.STATUS_CODES[this.status] ||
                "An error occurred during the request.";
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=index.js.map