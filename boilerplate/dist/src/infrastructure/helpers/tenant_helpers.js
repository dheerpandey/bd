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
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_1 = require("../config/ioc");
const tenant_repository_1 = require("../db/repositories/tenant_repository");
function getCurrentTenant(tenantId) {
    return __awaiter(this, void 0, void 0, function* () {
        const tenantRepository = ioc_1.iocContainer.get(tenant_repository_1.TenantRepository);
        const tenant = yield tenantRepository.findById(tenantId);
        if (!tenant)
            throw new Error("Tenant not found");
        return tenant;
    });
}
exports.getCurrentTenant = getCurrentTenant;
//# sourceMappingURL=tenant_helpers.js.map