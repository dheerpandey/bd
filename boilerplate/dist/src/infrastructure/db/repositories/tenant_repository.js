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
var TenantRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tenant_1 = require("../../../core/domain/models/tenant");
const ioc_1 = require("../../config/ioc");
const base_repository_1 = require("./base_repository");
let TenantRepository = TenantRepository_1 = class TenantRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(tenant_1.Tenant.getModel(), () => new tenant_1.Tenant());
    }
};
TenantRepository = TenantRepository_1 = __decorate([
    ioc_1.provideSingleton(TenantRepository_1),
    __metadata("design:paramtypes", [])
], TenantRepository);
exports.TenantRepository = TenantRepository;
//# sourceMappingURL=tenant_repository.js.map