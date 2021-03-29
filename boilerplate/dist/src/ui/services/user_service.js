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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_1 = require("../../core/domain/models/user");
const config_1 = require("../../infrastructure/config");
const ioc_1 = require("../../infrastructure/config/ioc");
const user_repository_1 = require("../../infrastructure/db/repositories/user_repository");
const error_1 = require("../error");
let UserService = UserService_1 = class UserService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = yield this._userRepository.findOneByQuery({
                email: user.email
            });
            if (newUser)
                throw new error_1.HttpError(http_status_codes_1.default.CONFLICT, `User with email "${newUser.email}" already exist`);
            newUser = yield this._userRepository.findOneByQuery({
                username: user.username
            });
            if (newUser)
                throw new error_1.HttpError(http_status_codes_1.default.CONFLICT, `User with username "${newUser.username}" already exist`);
            const saltRound = config_1.config.env === "development" || config_1.config.env === "test"
                ? 1
                : user_1.PASSWORD_SALT_ROUND;
            user.password = yield bcrypt_1.default.hash(user.password, saltRound);
            newUser = user_1.User.createInstance(Object.assign({}, user));
            yield this._userRepository.insertOrUpdate(newUser);
            return newUser;
        });
    }
    get(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query.id && !query.emailOrUsername)
                return Promise.reject(Error("One or more arguments must be passed"));
            let user;
            if (query.id && query.emailOrUsername) {
                user = yield this._userRepository.findOneByQuery({
                    _id: query.id,
                    $or: [
                        { email: query.emailOrUsername },
                        { username: query.emailOrUsername }
                    ]
                });
            }
            else if (query.id) {
                user = yield this._userRepository.findById(query.id);
            }
            else {
                user = yield this._userRepository.findOneByQuery({
                    $or: [
                        { email: query.emailOrUsername },
                        { username: query.emailOrUsername }
                    ]
                });
            }
            return user;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userRepository.findAll();
        });
    }
    pagedGetAll({ searchStr, skip, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userRepository.pagedFindAll({
                searchStr,
                limit,
                skip
            });
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToUpdate = yield this._userRepository.findById(user.id);
            if (!userToUpdate)
                throw new error_1.HttpError(http_status_codes_1.default.NOT_FOUND, `User with ID "${user.id}" does not exist`);
            userToUpdate.update(user);
            yield this._userRepository.insertOrUpdate(userToUpdate);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userRepository.deleteById(id);
        });
    }
};
__decorate([
    ioc_1.inject(user_repository_1.UserRepository),
    __metadata("design:type", Object)
], UserService.prototype, "_userRepository", void 0);
UserService = UserService_1 = __decorate([
    ioc_1.provideSingleton(UserService_1)
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user_service.js.map