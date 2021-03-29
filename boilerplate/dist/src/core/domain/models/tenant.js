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
var Tenant_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const class_transformer_1 = require("class-transformer");
const base_1 = require("./base");
/**
 *
 *
 * @export
 * @class Tenant
 * @extends {BaseEntity}
 */
let Tenant = Tenant_1 = class Tenant extends base_1.BaseEntity {
    constructor(arg) {
        super();
        this.type = "Tenant";
        if (!arg)
            return;
        const { name, description } = arg;
        this.name = name;
        this.description = description;
    }
    static getModel() {
        return typegoose_1.getModelForClass(this);
    }
    setName(name) {
        this.name = name;
    }
    /**
     * Sets the description of the tenant
     *
     * @param {string} description
     * @memberof Tenant
     */
    setDescription(description) {
        this.description = description;
    }
    /**
     * Sets an update on the tenant's name and/or description
     *
     * @param {Partial<this>} tenant
     * @memberof Tenant
     */
    update(tenant) {
        if (tenant.name)
            this.setName(tenant.name
                .replace(/\s/g, "")
                .toUpperCase());
        if (tenant.description)
            this.setDescription(tenant.description);
    }
};
/**
 * Creates and returns a new instance of Tenant
 *
 * @static
 * @memberof Tenant
 */
Tenant.createInstance = (name, description) => new Tenant_1({
    name: name.replace(/\s/g, "").toUpperCase(),
    description
});
__decorate([
    typegoose_1.prop({ required: true, default: "Tenant" }),
    __metadata("design:type", String)
], Tenant.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        uppercase: true,
        index: true,
        unique: true
    }),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], Tenant.prototype, "description", void 0);
Tenant = Tenant_1 = __decorate([
    typegoose_1.modelOptions({ options: { customName: "tenants" } }),
    __metadata("design:paramtypes", [Object])
], Tenant);
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.js.map