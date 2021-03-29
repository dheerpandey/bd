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
var TenantService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const class_transformer_1 = require("class-transformer");
const tenant_1 = require("../../core/domain/models/tenant");
const ioc_1 = require("../../infrastructure/config/ioc");
const tenant_dto_1 = require("../models/tenant_dto");
const tenant_repository_1 = require("../../infrastructure/db/repositories/tenant_repository");
const error_1 = require("../error");
let TenantService = TenantService_1 = class TenantService {
    create(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const tenant = yield this._tenantRepository.insertOrUpdate(tenant_1.Tenant.createInstance(name, description));
            return class_transformer_1.plainToClass(tenant_dto_1.TenantDto, tenant, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true
            });
        });
    }
    update(tenant) {
        return __awaiter(this, void 0, void 0, function* () {
            const tenantToUpdate = yield this._tenantRepository.findById(tenant.id);
            if (!tenantToUpdate)
                throw new error_1.HttpError(http_status_codes_1.default.NOT_FOUND, `Tenant with ID "${tenant.id}" does not exist`);
            // check that tenantToUpdate does not overwrite an existing tenant name
            tenantToUpdate.update(tenant);
            yield this._tenantRepository.insertOrUpdate(tenantToUpdate);
        });
    }
    pagedGetAll({ searchStr, skip, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._tenantRepository.pagedFindAll({
                searchStr,
                skip,
                limit
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tenants = yield this._tenantRepository.findAll();
            return class_transformer_1.plainToClass(tenant_dto_1.TenantDto, tenants, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true
            });
        });
    }
    get(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const tenant = yield this._tenantRepository.findOneByQuery({ name });
            const tenantDto = tenant &&
                class_transformer_1.plainToClass(tenant_dto_1.TenantDto, tenant, {
                    enableImplicitConversion: true,
                    excludeExtraneousValues: true
                });
            return tenantDto;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._tenantRepository.deleteById(id);
        });
    }
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            const tenants = yield this._tenantRepository.findAll();
            const tenantDto = class_transformer_1.plainToClass(tenant_dto_1.TenantDto, tenants, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true
            });
            return tenantDto;
        });
    }
};
__decorate([
    ioc_1.inject(tenant_repository_1.TenantRepository),
    __metadata("design:type", Object)
], TenantService.prototype, "_tenantRepository", void 0);
TenantService = TenantService_1 = __decorate([
    ioc_1.provideSingleton(TenantService_1)
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant_service.js.map