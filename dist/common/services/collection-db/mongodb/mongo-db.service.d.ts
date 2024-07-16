import { Document, Model } from 'mongoose';
import { IDbCrud } from './crud-db.interface';
export declare abstract class MongoDbService<T extends Document> implements IDbCrud<T> {
    private model;
    private readonly modelName;
    constructor(model: Model<T>);
    create(createDtos: any): Promise<T>;
    find(): Promise<T[]>;
    findOne(filter?: any): Promise<T>;
    findById(id: string): Promise<T>;
    findByIdAndUpdate(id: string, updateDto: any): Promise<T>;
    findByIdAndDelete(id: string): Promise<void>;
    deleteMany(): Promise<void>;
}
