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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const ioc_1 = require("../../../infrastructure/config/ioc");
const config_1 = require("../../../infrastructure/config");
const types_1 = require("../constants/types");
const base_1 = require("./base");
const tenant_1 = require("./tenant");
const db_operators_1 = require("../data/db_operators");
exports.MAX_NAME_LENGTH = 225;
exports.PASSWORD_SALT_ROUND = 12;
/**
 *
 *
 * @export
 * @enum {number}
 */
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
/**
 *
 *
 * @export
 * @class User
 * @extends {BaseEntity}
 * @implements {IMustHaveTenant}
 */
let User = User_1 = class User extends base_1.BaseEntity {
    constructor(arg) {
        super();
        /**
         *Gets the type of the user
         *
         * @type {string}
         * @memberof User
         */
        this.type = "User";
        /**
         * Gets the role assigned to the user
         *
         * @type {UserRole}
         * @memberof User
         */
        this.role = UserRole.USER;
        if (!arg)
            return;
        const { firstName, lastName, email, username, password, tenant } = arg;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.tenant = tenant;
    }
    /**
     * Returns true if the user is currently locked out
     *
     * @readonly
     * @type {boolean}
     * @memberof User
     */
    get isLockedOut() {
        return (this.failedSignInAttempts >= config_1.config.userLockout.maxSignInAttempts &&
            this.lockOutEndDate !== undefined &&
            this.lockOutEndDate > new Date());
    }
    static getModel() {
        return typegoose_1.getModelForClass(this);
    }
    /**
     * returns an update to be sent to the database for a particular user when a signin is attepted on that user
     *
     * @static
     * @returns {{ [key: string]: object }}
     * @memberof User
     */
    static getSignInAttemptUpdate() {
        const endDate = new Date();
        endDate.setMinutes(endDate.getMinutes() + config_1.config.userLockout.lockoutTime);
        return Object.assign(Object.assign({}, db_operators_1.inc({ failedSignInAttempts: 1 })), db_operators_1.set({ lockOutEndDate: endDate }));
    }
    /**
     * Sets the role of the user
     *
     * @param {UserRole} role
     * @memberof User
     */
    setRole(role) {
        this.role = role;
    }
    /**
     * Sets the email address of the user
     *
     * @param {string} email
     * @memberof User
     */
    setEmail(email) {
        this.email = email;
    }
    /**
     * Sets the username of the user
     *
     * @param {string} username
     * @memberof User
     */
    setUsername(username) {
        this.username = username;
    }
    /**
     * Sets the firstName of the user
     *
     * @param {string} firstName
     * @memberof User
     */
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    /**
     * Sets the lastName of the user
     *
     * @param {string} lastName
     * @memberof User
     */
    setLastName(lastName) {
        this.lastName = lastName;
    }
    /**
     * Sets the password hash of the user
     *
     * @param {string} password
     * @memberof User
     */
    setPassword(password) {
        this.password = password;
    }
    /**
     * Sets the reference to the tenant to which the user belongs
     *
     * @param {*} tenant
     * @memberof User
     */
    setTenant(tenant) {
        this.tenant = tenant;
    }
    /**
     * Updates the properties of the user which can be updated
     *
     * @param {Partial<this>} user
     * @memberof User
     */
    update(user) {
        if (user.firstName)
            this.setFirstName(user.firstName);
        if (user.lastName)
            this.setLastName(user.lastName);
        if (user.password)
            this.setPassword(user.password);
        if (user.username)
            this.setUsername(user.username);
        if (user.email)
            this.setEmail(user.email);
        if (user.role)
            this.setRole(user.role);
    }
    /**
     * Clears the failedSigninAttempts and lockOutEndDate of the user to their defaults
     *
     * @memberof User
     */
    clearLockOut() {
        this.lockOutEndDate = undefined;
        this.failedSignInAttempts = 0;
    }
};
/**
 * Creates and returns a new instance of User
 *
 * @static
 * @memberof User
 */
User.createInstance = ({ firstName, lastName, email, username, password, tenantId }) => {
    const id = tenantId || ioc_1.iocContainer.get(types_1.TYPES.TenantId);
    if (!id)
        throw new Error("Tenant Id is required");
    return new User_1({
        firstName,
        lastName,
        email,
        username,
        password,
        tenant: id
    });
};
__decorate([
    typegoose_1.prop({ required: true, default: "User" }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({ required: true, maxlength: exports.MAX_NAME_LENGTH, trim: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typegoose_1.prop({ required: true, maxlength: exports.MAX_NAME_LENGTH, trim: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typegoose_1.prop({ required: true, ref: tenant_1.Tenant, unique: false }),
    __metadata("design:type", Object)
], User.prototype, "tenant", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        maxlength: exports.MAX_NAME_LENGTH,
        trim: true,
        lowercase: true,
        text: true,
        unique: false
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        maxlength: exports.MAX_NAME_LENGTH,
        trim: true,
        lowercase: true,
        text: true,
        unique: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({ required: true, maxlength: exports.MAX_NAME_LENGTH }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop({
        enum: UserRole,
        required: true,
        default: UserRole.USER
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "failedSignInAttempts", void 0);
__decorate([
    typegoose_1.prop({ default: undefined }),
    __metadata("design:type", Date)
], User.prototype, "lockOutEndDate", void 0);
User = User_1 = __decorate([
    typegoose_1.modelOptions({ options: { customName: "users" } }),
    typegoose_1.index({ email: 1, tenant: 1 }, { unique: true }),
    typegoose_1.index({ username: 1, tenant: 1 }, { unique: true }),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.js.map