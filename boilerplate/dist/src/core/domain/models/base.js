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
var BaseEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const class_transformer_1 = require("class-transformer");
const ioc_1 = require("../../../infrastructure/config/ioc");
const logger_1 = require("../../../infrastructure/bootstrapping/loaders/logger");
const types_1 = require("../constants/types");
/**
 * Base entity from which other entities inherit
 *
 * @export
 * @abstract
 * @class BaseEntity
 * @extends {Typegoose}
 */
// eslint-disable-next-line
let BaseEntity = BaseEntity_1 = class BaseEntity extends defaultClasses_1.TimeStamps {
    constructor() {
        super(...arguments);
        /**
         * Gets the date and time the entity was created
         *
         * @type {Date}
         * @memberof BaseEntity
         */
        this.createdAt = new Date();
        /**
         * Gets a reference to the user who added this entity
         *
         * @type {(Ref<User | null>)}
         * @memberof BaseEntity
         */
        this.createdBy = null;
        /**
         * Gets the date and time the entity was last updated
         *
         * @type {Date}
         * @memberof BaseEntity
         */
        this.updatedBy = null;
        /**
         * Gets the entity's active status
         *
         * @type {boolean}
         * @memberof BaseEntity
         */
        this.isActive = true;
        /**
         * Specifies whether the entity has been soft-deleted
         *
         * @type {boolean}
         * @memberof BaseEntity
         */
        this.isDeleted = false;
        /**
         * Gets a reference to the user who deleted this entity if the entity has been soft-deleted
         *
         * @type {(Ref<User | null>)}
         * @memberof BaseEntity
         */
        this.deletedBy = null;
    }
    /**
     * Sets {isDeleted} to true
     *
     * @memberof BaseEntity
     */
    delete() {
        this.isDeleted = true;
    }
    /**
     * Sets {isDeleted} to false
     *
     * @memberof BaseEntity
     */
    restore() {
        this.isDeleted = false;
    }
    /**
     * Sets {isActive} to true
     *
     * @memberof BaseEntity
     */
    deactivate() {
        this.isActive = false;
    }
    /**
     * Sets isActive to false
     *
     * @memberof BaseEntity
     */
    activate() {
        this.isActive = true;
    }
};
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Object)
], BaseEntity.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    typegoose_1.prop({ required: true, default: new Date() }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    class_transformer_1.Expose(),
    typegoose_1.prop({ default: null, ref: BaseEntity_1 }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "createdBy", void 0);
__decorate([
    class_transformer_1.Expose(),
    typegoose_1.prop({ default: null, ref: BaseEntity_1 }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "updatedBy", void 0);
__decorate([
    class_transformer_1.Expose(),
    typegoose_1.prop({ required: true, default: true }),
    __metadata("design:type", Boolean)
], BaseEntity.prototype, "isActive", void 0);
__decorate([
    class_transformer_1.Expose(),
    typegoose_1.prop({ required: true, default: false }),
    __metadata("design:type", Boolean)
], BaseEntity.prototype, "isDeleted", void 0);
__decorate([
    class_transformer_1.Expose(),
    typegoose_1.prop({ default: null, ref: BaseEntity_1 }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "deletedBy", void 0);
__decorate([
    class_transformer_1.Expose(),
    typegoose_1.prop({ default: null }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "deletionTime", void 0);
BaseEntity = BaseEntity_1 = __decorate([
    typegoose_1.pre("findOneAndUpdate", function () {
        try {
            const entity = this.getUpdate();
            if (ioc_1.iocContainer.isBound(types_1.TYPES.DecodedJwt)) {
                const currentUser = ioc_1.iocContainer.get(types_1.TYPES.DecodedJwt);
                entity.updatedBy = currentUser.userId;
                if (entity.isDeleted) {
                    entity.deletedBy = currentUser.userId;
                    entity.deletionTime = new Date();
                }
            }
        }
        catch (error) {
            logger_1.winstonLoggerInstance.error(error);
            throw new Error(error);
        }
    })
    // eslint-disable-next-line
    ,
    typegoose_1.pre("save", function () {
        try {
            if (ioc_1.iocContainer.isBound(types_1.TYPES.DecodedJwt)) {
                const currentUser = ioc_1.iocContainer.get(types_1.TYPES.DecodedJwt);
                this.createdBy = currentUser.userId;
                if (this.type === "User" && !this.tenant)
                    this.setTenant(currentUser.tenantId);
            }
            else if (this.type === "User") {
                this.createdBy = this;
            }
        }
        catch (error) {
            logger_1.winstonLoggerInstance.error(error);
            throw new Error(error);
        }
    }),
    typegoose_1.modelOptions({
        schemaOptions: {
            toJSON: {
                virtuals: true,
                transform: (doc, ret) => {
                    ret.id = ret._id;
                    delete ret._id;
                }
            }
        }
    })
], BaseEntity);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.js.map