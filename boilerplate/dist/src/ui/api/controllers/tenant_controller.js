"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var TenantController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const inversify_1 = require("inversify");
const tsoa_1 = require("tsoa");
const ioc_1 = require("../../../infrastructure/config/ioc");
const server_utils_1 = require("../../../infrastructure/utils/server_utils");
const error_1 = require("../../error");
const tenant_dto_1 = require("../../models/tenant_dto");
const tenant_service_1 = require("../../services/tenant_service");
const base_controller_1 = require("./base_controller");
let TenantController = TenantController_1 = class TenantController extends base_controller_1.BaseController {
    getTenant(tenantName) {
        return __awaiter(this, void 0, void 0, function* () {
            const tenant = yield this._tenantService.get(tenantName);
            if (!tenant)
                throw new error_1.HttpError(http_status_codes_1.default.NOT_FOUND);
            return tenant;
        });
    }
    getTenants(searchStr, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { totalCount, items } = yield this._tenantService.pagedGetAll({
                searchStr,
                skip: skip || 0,
                limit: limit || 50
            });
            const users = class_transformer_1.plainToClass(tenant_dto_1.TenantDto, items, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true
            });
            return {
                totalCount,
                items: users
            };
        });
    }
    createTenant(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkBadRequest(class_transformer_1.plainToClass(tenant_dto_1.CreateTenantInput, input));
            yield this.checkConflict(yield this._tenantService.get(input.name));
            return this._tenantService.create(input.name, input.description);
        });
    }
    updateTenant(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkUUID(id);
            if (!input)
                return this.setStatus(http_status_codes_1.default.NO_CONTENT);
            yield this.checkBadRequest(class_transformer_1.plainToClass(tenant_dto_1.TenantUpdateInput, input));
            input = JSON.parse(JSON.stringify(input));
            yield this._tenantService.update(Object.assign(Object.assign({}, input), { id }));
        });
    }
    deleteTenant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!server_utils_1.isIdValid(id))
                throw new error_1.HttpError(http_status_codes_1.default.BAD_REQUEST, `ID "${id}" is invalid`);
            const isDeleted = yield this._tenantService.delete(id);
            if (!isDeleted)
                this.setStatus(http_status_codes_1.default.NOT_FOUND);
        });
    }
};
__decorate([
    inversify_1.inject(tenant_service_1.TenantService),
    __metadata("design:type", Object)
], TenantController.prototype, "_tenantService", void 0);
__decorate([
    tsoa_1.Get("{tenantName}"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getTenant", null);
__decorate([
    tsoa_1.Get(),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    __param(0, tsoa_1.Query()),
    __param(1, tsoa_1.Query()),
    __param(2, tsoa_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getTenants", null);
__decorate([
    tsoa_1.Post(),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    tsoa_1.Response(http_status_codes_1.default.FORBIDDEN, http_1.default.STATUS_CODES[http_status_codes_1.default.FORBIDDEN]),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.CreateTenantInput]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "createTenant", null);
__decorate([
    tsoa_1.Put("{id}"),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    __param(1, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tenant_dto_1.TenantUpdateInput]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "updateTenant", null);
__decorate([
    tsoa_1.Delete("{id}"),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "deleteTenant", null);
TenantController = TenantController_1 = __decorate([
    tsoa_1.Tags("Tenants"),
    tsoa_1.Route("tenants"),
    ioc_1.provideSingleton(TenantController_1)
], TenantController);
exports.TenantController = TenantController;
//# sourceMappingURL=tenant_controller.js.map