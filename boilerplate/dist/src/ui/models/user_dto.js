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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_1 = require("../../core/domain/models/user");
const base_dto_1 = require("./base_dto");
class UserSignUpInput {
}
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserSignUpInput.prototype, "firstName", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserSignUpInput.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserSignUpInput.prototype, "email", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserSignUpInput.prototype, "username", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserSignUpInput.prototype, "password", void 0);
exports.UserSignUpInput = UserSignUpInput;
class UserSignInInput {
}
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserSignInInput.prototype, "emailOrUsername", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserSignInInput.prototype, "password", void 0);
exports.UserSignInInput = UserSignInInput;
class UserDto extends base_dto_1.BaseEntityDto {
}
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsEmail(),
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
exports.UserDto = UserDto;
class UserUpdateInput {
}
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "firstName", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "lastName", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsEmail(),
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "email", void 0);
__decorate([
    class_validator_1.MaxLength(user_1.MAX_NAME_LENGTH),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "username", void 0);
exports.UserUpdateInput = UserUpdateInput;
//# sourceMappingURL=user_dto.js.map