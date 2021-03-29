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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const class_transformer_1 = require("class-transformer");
const event_dispatch_1 = require("event-dispatch");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const decorators_1 = require("../../core/domain/constants/decorators");
const user_1 = require("../../core/domain/models/user");
const config_1 = require("../../infrastructure/config");
const ioc_1 = require("../../infrastructure/config/ioc");
const user_repository_1 = require("../../infrastructure/db/repositories/user_repository");
const error_1 = require("../error");
const user_dto_1 = require("../models/user_dto");
const events_1 = require("../subscribers/events");
const db_operators_1 = require("../../core/domain/data/db_operators");
let AuthService = AuthService_1 = class AuthService {
    signUp(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Use less salt round for faster hashing on test and development but stronger hashing on production
            const saltRound = config_1.config.env === "development" || config_1.config.env === "test"
                ? 1
                : user_1.PASSWORD_SALT_ROUND;
            const hashedPassword = yield bcrypt_1.default.hash(dto.password, saltRound);
            let user = yield this._userRepository.findOneByQuery({
                email: dto.email
            });
            if (user)
                throw new error_1.HttpError(http_status_codes_1.default.CONFLICT, `Email "${dto.email.toLowerCase()}" is already taken`);
            user = yield this._userRepository.findOneByQuery({
                username: dto.username
            });
            if (user)
                throw new error_1.HttpError(http_status_codes_1.default.CONFLICT, `Username "${dto.username.toLowerCase()}" is already taken`);
            user = yield this._userRepository.insertOrUpdate(user_1.User.createInstance(Object.assign(Object.assign({}, dto), { password: hashedPassword })));
            this._eventDispatcher.dispatch(events_1.events.user.signUp, Object.assign({}, dto));
            const token = yield this.generateToken(user);
            const userDto = class_transformer_1.plainToClass(user_dto_1.UserDto, user, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true
            });
            return { userDto, token };
        });
    }
    signIn(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserRecord(dto.emailOrUsername);
            yield this.processSignInAttempt(dto, user);
            const token = yield this.generateToken(user);
            return { token };
        });
    }
    processSignInAttempt(dto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new error_1.HttpError(http_status_codes_1.default.UNAUTHORIZED, "Invalid login attempt!");
            const isPasswordValid = yield bcrypt_1.default.compare(dto.password, user.password);
            if (user.isLockedOut || !isPasswordValid) {
                throw new error_1.HttpError(http_status_codes_1.default.BAD_REQUEST, "Invalid login attempt!");
            }
            // clear the signin attempts of the user and lockout end date
            user.clearLockOut();
            yield this._userRepository.insertOrUpdate(user);
        });
    }
    getUserRecord(emailOrUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            // increase the user's signin attempt for every of this call if the user is not yet locked
            return this._userRepository.findOneByQueryAndUpdate(this.getSignInQuery(emailOrUsername), user_1.User.getSignInAttemptUpdate());
        });
    }
    getSignInQuery(emailOrUsername) {
        return db_operators_1.and(db_operators_1.or({ email: emailOrUsername }, { username: emailOrUsername }), db_operators_1.or({
            failedSignInAttempts: db_operators_1.lt(config_1.config.userLockout.maxSignInAttempts)
        }, {
            lockOutEndDate: db_operators_1.lt(new Date())
        }));
    }
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const exp = new Date(today);
            exp.setDate(today.getDate() + 60);
            const payload = {
                userId: user.id,
                role: user.role,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                tenantId: user.tenant
            };
            return jsonwebtoken_1.default.sign(payload, config_1.config.jwtSecret, { expiresIn: "2 days" });
        });
    }
};
__decorate([
    ioc_1.inject(user_repository_1.UserRepository),
    __metadata("design:type", Object)
], AuthService.prototype, "_userRepository", void 0);
__decorate([
    decorators_1.eventDispatcher,
    __metadata("design:type", event_dispatch_1.EventDispatcher)
], AuthService.prototype, "_eventDispatcher", void 0);
AuthService = AuthService_1 = __decorate([
    ioc_1.provideSingleton(AuthService_1)
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth_service.js.map