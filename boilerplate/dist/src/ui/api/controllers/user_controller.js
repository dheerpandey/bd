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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const tsoa_1 = require("tsoa");
const ioc_1 = require("../../../infrastructure/config/ioc");
const error_1 = require("../../error");
const user_dto_1 = require("../../models/user_dto");
const user_service_1 = require("../../services/user_service");
const base_controller_1 = require("./base_controller");
let UserController = UserController_1 = class UserController extends base_controller_1.BaseController {
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkBadRequest(class_transformer_1.plainToClass(user_dto_1.UserSignUpInput, input));
            const user = yield this._userService.create(input);
            return class_transformer_1.plainToClass(user_dto_1.UserDto, user, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true
            });
        });
    }
    updateUser(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkUUID(id);
            if (!input)
                return this.setStatus(http_status_codes_1.default.NO_CONTENT);
            yield this.checkBadRequest(class_transformer_1.plainToClass(user_dto_1.UserUpdateInput, input));
            input = JSON.parse(JSON.stringify(input));
            yield this._userService.update(Object.assign(Object.assign({}, input), { id }));
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkUUID(id);
            const user = yield this._userService.get({ id });
            if (user)
                return class_transformer_1.plainToClass(user_dto_1.UserDto, user, {
                    enableImplicitConversion: true,
                    excludeExtraneousValues: true
                });
            throw new error_1.HttpError(http_status_codes_1.default.NOT_FOUND);
        });
    }
    getUsers(searchStr, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { totalCount, items } = yield this._userService.pagedGetAll({
                searchStr,
                skip: skip || 0,
                limit: limit || 50
            });
            const users = class_transformer_1.plainToClass(user_dto_1.UserDto, items, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true
            });
            return {
                totalCount,
                items: users
            };
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkUUID(id);
            const isDeleted = yield this._userService.delete(id);
            if (!isDeleted)
                this.setStatus(http_status_codes_1.default.NOT_FOUND);
        });
    }
};
__decorate([
    ioc_1.inject(user_service_1.UserService),
    __metadata("design:type", Object)
], UserController.prototype, "_userService", void 0);
__decorate([
    tsoa_1.Post(),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserSignUpInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    tsoa_1.Put("{id}"),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    __param(1, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserUpdateInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    tsoa_1.Get("{id}"),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    tsoa_1.Get(),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    __param(0, tsoa_1.Query()),
    __param(1, tsoa_1.Query()),
    __param(2, tsoa_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    tsoa_1.Delete("{id}"),
    tsoa_1.Security("X-Auth-Token", ["admin"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = UserController_1 = __decorate([
    tsoa_1.Tags("Users"),
    tsoa_1.Route("users"),
    ioc_1.provideSingleton(UserController_1)
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user_controller.js.map