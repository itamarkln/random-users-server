import { Model } from 'mongoose';
import { MongoDbService } from 'src/common/services/collection-db/mongodb/mongo-db.service';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UserService extends MongoDbService<UserDocument> {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createDto: CreateUserDto): Promise<UserDocument>;
}
