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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const inversify_1 = require("inversify");
const tsoa_1 = require("tsoa");
const ioc_1 = require("../../../infrastructure/config/ioc");
const user_dto_1 = require("../../models/user_dto");
const auth_service_1 = require("../../services/auth_service");
const base_controller_1 = require("./base_controller");
let AuthController = AuthController_1 = class AuthController extends base_controller_1.BaseController {
    signUp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkBadRequest(class_transformer_1.plainToClass(user_dto_1.UserSignUpInput, input));
            return this._authService.signUp(input);
        });
    }
    signIn(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkBadRequest(class_transformer_1.plainToClass(user_dto_1.UserSignInInput, input));
            return this._authService.signIn(input);
        });
    }
};
__decorate([
    inversify_1.inject(auth_service_1.AuthService),
    __metadata("design:type", Object)
], AuthController.prototype, "_authService", void 0);
__decorate([
    tsoa_1.Post("signUp"),
    tsoa_1.Security("X-Tenant-Id"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserSignUpInput]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    tsoa_1.Post("signIn"),
    tsoa_1.Security("X-Tenant-Id"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserSignInInput]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
AuthController = AuthController_1 = __decorate([
    tsoa_1.Tags("Auth"),
    tsoa_1.Route("auth"),
    ioc_1.provideSingleton(AuthController_1)
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth_controller.js.map