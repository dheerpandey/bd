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
var BaseRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
const types_1 = require("../../../core/domain/constants/types");
const ioc_1 = require("../../config/ioc");
const logger_1 = require("../../bootstrapping/loaders/logger");
let BaseRepository = BaseRepository_1 = class BaseRepository {
    constructor(model, constructor) {
        // deleteOneByQuery(query: Query<TEntity>): Promise<number> {
        //     throw new Error("Method not implemented.");
        // }
        // deleteManyByQuery(query?: Query<TEntity> | undefined): Promise<number> {
        //     throw new Error("Method not implemented.");
        // }
        // #region Helper methods
        /**
         * Maps '_id' from mongodb to 'id' of TEntity
         *
         * @private
         * @param {TModel} model
         * @returns {TEntity}
         * @memberof BaseRepository
         */
        this.readMapper = (model) => {
            if (Array.isArray(model)) {
                const entities = [];
                return class_transformer_1.plainToClassFromExist(entities, model);
            }
            const entity = this._constructor();
            return class_transformer_1.plainToClassFromExist(entity, model.toJSON());
        };
        model.schema.set("toObject", {
            virtuals: true,
            versionKey: false,
            transform: (doc, ret) => {
                delete ret._id;
                return ret;
            }
        });
        this.Model = model;
        this._constructor = constructor;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = JSON.parse(JSON.stringify({
                isDeleted: { $ne: true },
                tenant: this.getCurrentTenant()
            }));
            return new Promise((resolve, reject) => {
                this.Model.find(query, (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(this.readMapper(res));
                });
            });
        });
    }
    pagedFindAll({ searchStr, skip, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = JSON.parse(JSON.stringify({
                $text: { $search: searchStr },
                isDeleted: { $ne: true },
                tenant: this.getCurrentTenant()
            }));
            if (!Object.keys(query.$text).length)
                delete query.$text;
            skip = skip < 0 ? 0 : Math.floor(skip);
            limit = limit < 0 ? 0 : Math.floor(limit);
            try {
                const [totalCount, res] = yield Promise.all([
                    this.Model.find()
                        .countDocuments()
                        .exec(),
                    this.Model.find(query)
                        .sort("-createdAt")
                        .skip(skip)
                        .limit(limit)
                        .exec()
                ]);
                const items = this.readMapper(res);
                return { totalCount, items };
            }
            catch (error) {
                logger_1.winstonLoggerInstance.error(error);
                throw new Error(error);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = JSON.parse(JSON.stringify({
                _id: id,
                isDeleted: { $ne: true },
                tenant: this.getCurrentTenant()
            }));
            return new Promise((resolve, reject) => {
                this.Model.findOne(query, (err, res) => {
                    if (err)
                        return reject(err);
                    if (!res)
                        return resolve();
                    resolve(this.readMapper(res));
                });
            });
        });
    }
    hardFindById(id) {
        return new Promise((resolve, reject) => {
            this.Model.findById(id, (err, res) => {
                if (err)
                    return reject(err);
                if (!res)
                    return resolve();
                return resolve(this.readMapper(res));
            });
        });
    }
    insertOrUpdate(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (doc.id) {
                    const query = JSON.parse(JSON.stringify({
                        _id: doc.id,
                        isDeleted: { $ne: true },
                        tenant: this.getCurrentTenant()
                    }));
                    this.Model.findByIdAndUpdate(query, doc, { new: true }, (err, res) => {
                        if (err)
                            return reject(err);
                        if (!res)
                            return resolve();
                        Object.assign(doc, this.readMapper(res));
                        return resolve(doc);
                    });
                }
                else {
                    const instance = new this.Model(doc);
                    instance.save((err, res) => {
                        if (err)
                            return reject(err);
                        Object.assign(doc, this.readMapper(res));
                        return resolve(doc);
                    });
                }
            });
        });
    }
    insertMany(docs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = (yield this.Model.insertMany(docs));
                docs.length = 0;
                [].push.apply(docs, list);
            }
            catch (error) {
                logger_1.winstonLoggerInstance.error(error);
                throw new Error(error);
            }
        });
    }
    findManyById(ids) {
        const query = JSON.parse(JSON.stringify({
            _id: { $in: ids },
            isDeleted: { $ne: true },
            tenant: this.getCurrentTenant()
        }));
        return new Promise((resolve, reject) => {
            this.Model.find(query, (err, res) => {
                if (err)
                    return reject(err);
                resolve(this.readMapper(res));
            });
        });
    }
    findManyByQuery(query) {
        query = JSON.parse(JSON.stringify(Object.assign(Object.assign({}, query), { isDeleted: { $ne: true }, tenant: this.getCurrentTenant() })));
        return new Promise((resolve, reject) => {
            this.Model.find(query, (err, res) => {
                if (err)
                    return reject(err);
                if (!res)
                    return resolve();
                resolve(this.readMapper(res));
            });
        });
    }
    findOneByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            query = JSON.parse(JSON.stringify(Object.assign(Object.assign({}, query), { isDeleted: { $ne: true }, tenant: this.getCurrentTenant() })));
            return new Promise((resolve, reject) => {
                this.Model.findOne(query, (err, res) => {
                    if (err)
                        return reject(err);
                    if (!res)
                        return resolve();
                    resolve(this.readMapper(res));
                });
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.findById(id);
            if (!item)
                return false;
            item.delete();
            yield this.insertOrUpdate(item);
            return true;
        });
    }
    findOneByQueryAndUpdate(query, update) {
        query = JSON.parse(JSON.stringify(Object.assign(Object.assign({}, query), { isDeleted: { $ne: true }, tenant: this.getCurrentTenant() })));
        return new Promise((resolve, reject) => {
            this.Model.findOneAndUpdate(query, update, { new: true }, (err, res) => {
                if (err)
                    return reject(err);
                if (!res)
                    return resolve();
                return resolve(this.readMapper(res));
            });
        });
    }
    getCurrentTenant() {
        return this._constructor().type !== "Tenant"
            ? ioc_1.iocContainer.get(types_1.TYPES.TenantId)
            : undefined;
    }
};
BaseRepository = BaseRepository_1 = __decorate([
    ioc_1.provideSingleton(BaseRepository_1),
    __param(0, inversify_1.unmanaged()),
    __param(1, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [mongoose_1.Model, Function])
], BaseRepository);
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base_repository.js.map