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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_1 = require("../../core/domain/models/user");
const base_dto_1 = require("./base_dto");
class CreateTenantInput extends base_dto_1.BaseCreateEntityDto {
}
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTenantInput.prototype, "name", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateTenantInput.prototype, "description", void 0);
exports.CreateTenantInput = CreateTenantInput;
class TenantUpdateInput {
}
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TenantUpdateInput.prototype, "name", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TenantUpdateInput.prototype, "description", void 0);
exports.TenantUpdateInput = TenantUpdateInput;
class TenantDto extends base_dto_1.BaseEntityDto {
}
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], TenantDto.prototype, "name", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], TenantDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], TenantDto.prototype, "isActive", void 0);
exports.TenantDto = TenantDto;
//# sourceMappingURL=tenant_dto.js.map