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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../../../core/domain/constants/types");
const user_1 = require("../../../core/domain/models/user");
const config_1 = require("../../../infrastructure/config");
const ioc_1 = require("../../../infrastructure/config/ioc");
const tenant_repository_1 = require("../../../infrastructure/db/repositories/tenant_repository");
const server_utils_1 = require("../../../infrastructure/utils/server_utils");
const header_constants_1 = require("../../constants/header_constants");
const error_1 = require("../../error");
function authentication(iocContainer) {
    return (req, securityName, scopes = ["user"]) => __awaiter(this, void 0, void 0, function* () {
        switch (securityName) {
            case header_constants_1.X_AUTH_TOKEN_KEY: {
                const token = req.header(header_constants_1.X_AUTH_TOKEN_KEY);
                // Check if X-Auth-Token header was passed in sign-up endpoint
                if (!token)
                    throw new error_1.HttpError(http_status_codes_1.default.UNAUTHORIZED, `Missing ${header_constants_1.X_AUTH_TOKEN_KEY} header!`);
                yield assignJwt(token, scopes, iocContainer);
                return token;
            }
            case header_constants_1.X_TENANT_ID: {
                const tenantId = req.header(header_constants_1.X_TENANT_ID);
                if (!tenantId)
                    throw new error_1.HttpError(http_status_codes_1.default.BAD_REQUEST, `Missing ${header_constants_1.X_TENANT_ID} header!`);
                yield assignTenantToReqAsync(iocContainer, tenantId);
                return tenantId;
            }
            default:
                throw new error_1.HttpError(http_status_codes_1.default.INTERNAL_SERVER_ERROR, "Invalid security name");
        }
    });
}
function assignJwt(token, scopes, iocContainer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decodedJwt = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
            const expectedUserRole = user_1.UserRole[scopes[0].toUpperCase()];
            if (expectedUserRole !== user_1.UserRole.USER &&
                decodedJwt.role !== expectedUserRole)
                throw new error_1.HttpError(http_status_codes_1.default.FORBIDDEN, "Access denied!");
            const tenantRepository = iocContainer.get(tenant_repository_1.TenantRepository);
            const tenant = yield tenantRepository.findById(decodedJwt.tenantId);
            if (!tenant || !tenant.isActive)
                throw new error_1.HttpError(http_status_codes_1.default.UNAUTHORIZED, "Tenant is not available!");
            if (!iocContainer.isBound(types_1.TYPES.TenantId))
                iocContainer
                    .bind(types_1.TYPES.TenantId)
                    .toConstantValue(decodedJwt.tenantId);
            if (iocContainer.isBound(types_1.TYPES.DecodedJwt))
                iocContainer.unbind(types_1.TYPES.DecodedJwt);
            iocContainer
                .bind(types_1.TYPES.DecodedJwt)
                .toConstantValue(decodedJwt);
        }
        catch (error) {
            throw new error_1.HttpError(error.status, error.message);
        }
    });
}
function assignTenantToReqAsync(iocContainer, tenantId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!server_utils_1.isIdValid(tenantId))
            throw new error_1.HttpError(http_status_codes_1.default.BAD_REQUEST, `${tenantId} is not a valid ${header_constants_1.X_TENANT_ID} header`);
        const tenantRepo = iocContainer.get(tenant_repository_1.TenantRepository);
        const tenant = yield tenantRepo.findById(tenantId);
        if (!tenant)
            throw new error_1.HttpError(http_status_codes_1.default.UNAUTHORIZED, `Tenant ${tenantId} is unavailable`);
        if (iocContainer.isBound(types_1.TYPES.TenantId))
            iocContainer.unbind(types_1.TYPES.TenantId);
        iocContainer.bind(types_1.TYPES.TenantId).toConstantValue(tenant.id);
    });
}
exports.expressAuthentication = authentication(ioc_1.iocContainer);
//# sourceMappingURL=auth_middleware.js.map