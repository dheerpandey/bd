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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const tenant_1 = require("../../core/domain/models/tenant");
const user_1 = require("../../core/domain/models/user");
const logger_1 = require("../bootstrapping/loaders/logger");
function seedDefaultTenant() {
    return __awaiter(this, void 0, void 0, function* () {
        const tenant = tenant_1.Tenant.createInstance("Default", "Default tenant");
        const tenantModel = tenant_1.Tenant.getModel();
        const defaultTenant = yield tenantModel.findOne({ name: "Default" });
        if (defaultTenant)
            return defaultTenant.id;
        return tenantModel.create(tenant);
    });
}
exports.seedDefaultTenant = seedDefaultTenant;
function seedDefaultAdmin(tenantId) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcrypt_1.default.hash("123qwe", 1);
        const user = user_1.User.createInstance({
            firstName: "Admin",
            lastName: "Admin",
            username: "Admin",
            email: "defaultAdmin@email.com",
            tenantId,
            password
        });
        const userModel = user_1.User.getModel();
        const defaultAdminUser = yield userModel.findOne({
            $or: [
                { email: user.email, tenant: tenantId },
                { username: user.username, tenant: tenantId }
            ]
        });
        if (!defaultAdminUser) {
            user.setRole(user_1.UserRole.ADMIN);
            yield userModel.create(user);
        }
    });
}
exports.seedDefaultAdmin = seedDefaultAdmin;
function getDatabaseClient(connStr) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            mongoose_1.default.connect(connStr, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
            const db = mongoose_1.default.connection;
            db.on("error", (e) => {
                logger_1.winstonLoggerInstance.error("❌ Db connection error:", e);
                reject(e);
            });
            db.once("open", () => __awaiter(this, void 0, void 0, function* () {
                logger_1.winstonLoggerInstance.info("✔️  Db connection successful");
                resolve(mongoose_1.default);
            }));
        });
    });
}
exports.getDatabaseClient = getDatabaseClient;
//# sourceMappingURL=db_client.js.map