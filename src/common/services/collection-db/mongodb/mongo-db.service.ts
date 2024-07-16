import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { isNullOrUndefined } from 'util';
import { IDbCrud } from './crud-db.interface';

@Injectable()
export abstract class MongoDbService<T extends Document> implements IDbCrud<T> {
  private readonly modelName: string;

  constructor(private model: Model<T>) {
    for (const modelName of Object.keys(model.collection.conn.models)) {
      if (model.collection.conn.models[modelName] === this.model) {
        this.modelName = modelName;
        break;
      }
    }
    this.model.schema.virtual('id').get(function (this: any) {
      return this._id.toHexString();
    });
  }

  public async create(createDtos: any): Promise<T> {
    try {
      const newModel = new this.model(createDtos);
      const result = await newModel.save();
      return result.toObject({ virtuals: true }) as T;
    } catch (error) {
      throw new BadRequestException(`Could not create ${this.modelName}.`);
    }
  }

  public async find(): Promise<T[]> {
    const docs = await this.model.find().lean({ getters: true, virtuals: true }).exec() as T[];
    return docs.map(doc => ({ ...doc, id: doc._id }));
  }

  public async findOne(filter: any = {}): Promise<T> {
    try {
      const result = await this.model.findOne(filter).exec();
      if (isNullOrUndefined(result)) return null;
      return result.toObject({ virtuals: true }) as T;
    } catch (error) {
      throw new NotFoundException(`Could not find ${this.modelName} by filter#${JSON.stringify(filter)}.`);
    }
  }

  public async findById(id: string): Promise<T> {
    try {
      const result = await this.model.findById(id).exec();
      if (isNullOrUndefined(result)) return null;
      return result.toObject({ virtuals: true }) as T;
    } catch (error) {
      throw new NotFoundException(`Could not find ${this.modelName}#${id}.`);
    }
  }

  public async findByIdAndUpdate(id: string, updateDto: any): Promise<T> {
    try {
      const updatedModel = await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
      if (isNullOrUndefined(updatedModel))
        throw new NotFoundException(`Could not find ${this.modelName}.`);
      return updatedModel.toObject({ virtuals: true }) as T;
    } catch (error) {
      throw new NotFoundException(`Could not update ${this.modelName}#${id}.`);
    }
  }

  public async findByIdAndDelete(id: string): Promise<void> {
    try {
      const result = await this.model.findByIdAndDelete(id).lean({ virtuals: true }).exec();
      if (isNullOrUndefined(result))
        throw new NotFoundException(`Could not find ${this.modelName}.`);
    } catch (error) {
      throw new NotFoundException(`Could not delete ${this.modelName}#${id}.`);
    }
  }

  public async deleteMany(): Promise<void> {
    this.model.deleteMany({}).exec();
  }
}
