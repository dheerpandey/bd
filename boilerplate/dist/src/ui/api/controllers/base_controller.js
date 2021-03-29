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
const class_validator_1 = require("class-validator");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const tsoa_1 = require("tsoa");
const server_utils_1 = require("../../../infrastructure/utils/server_utils");
const error_1 = require("../../error");
class BaseController extends tsoa_1.Controller {
    checkBadRequest(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(input);
            if (errors.length > 0) {
                const error = errors
                    .map((error) => error.constraints)
                    .map(err => Object.values(err)[0])
                    .join(", ");
                this.setStatus(http_status_codes_1.default.BAD_REQUEST);
                throw new error_1.HttpError(http_status_codes_1.default.BAD_REQUEST, error);
            }
        });
    }
    checkConflict(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input) {
                this.setStatus(http_status_codes_1.default.CONFLICT);
                throw new error_1.HttpError(http_status_codes_1.default.CONFLICT);
            }
        });
    }
    checkUUID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!server_utils_1.isIdValid(id)) {
                this.setStatus(http_status_codes_1.default.BAD_REQUEST);
                throw new error_1.HttpError(http_status_codes_1.default.BAD_REQUEST, `ID "${id}" is invalid`);
            }
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base_controller.js.map