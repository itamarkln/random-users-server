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
exports.MongoDbService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const util_1 = require("util");
let MongoDbService = class MongoDbService {
    constructor(model) {
        this.model = model;
        for (const modelName of Object.keys(model.collection.conn.models)) {
            if (model.collection.conn.models[modelName] === this.model) {
                this.modelName = modelName;
                break;
            }
        }
        this.model.schema.virtual('id').get(function () {
            return this._id.toHexString();
        });
    }
    async create(createDtos) {
        try {
            const newModel = new this.model(createDtos);
            const result = await newModel.save();
            return result.toObject({ virtuals: true });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Could not create ${this.modelName}.`);
        }
    }
    async find() {
        const docs = await this.model.find().lean({ getters: true, virtuals: true }).exec();
        return docs.map(doc => (Object.assign(Object.assign({}, doc), { id: doc._id })));
    }
    async findOne(filter = {}) {
        try {
            const result = await this.model.findOne(filter).exec();
            if ((0, util_1.isNullOrUndefined)(result))
                return null;
            return result.toObject({ virtuals: true });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Could not find ${this.modelName} by filter#${JSON.stringify(filter)}.`);
        }
    }
    async findById(id) {
        try {
            const result = await this.model.findById(id).exec();
            if ((0, util_1.isNullOrUndefined)(result))
                return null;
            return result.toObject({ virtuals: true });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Could not find ${this.modelName}#${id}.`);
        }
    }
    async findByIdAndUpdate(id, updateDto) {
        try {
            const updatedModel = await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
            if ((0, util_1.isNullOrUndefined)(updatedModel))
                throw new common_1.NotFoundException(`Could not find ${this.modelName}.`);
            return updatedModel.toObject({ virtuals: true });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Could not update ${this.modelName}#${id}.`);
        }
    }
    async findByIdAndDelete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id).lean({ virtuals: true }).exec();
            if ((0, util_1.isNullOrUndefined)(result))
                throw new common_1.NotFoundException(`Could not find ${this.modelName}.`);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Could not delete ${this.modelName}#${id}.`);
        }
    }
    async deleteMany() {
        this.model.deleteMany({}).exec();
    }
};
MongoDbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongoose_1.Model])
], MongoDbService);
exports.MongoDbService = MongoDbService;
//# sourceMappingURL=mongo-db.service.js.map