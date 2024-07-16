import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoDbService } from 'src/common/services/collection-db/mongodb/mongo-db.service';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService extends MongoDbService<UserDocument> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel)
    }

    public async create(createDto: CreateUserDto): Promise<UserDocument> {
        const foundUser = await this.findOne({ loginUuid: createDto.loginUuid });

        if (foundUser) {
            throw new ConflictException(`${this.userModel.name} already exists`);
        }

        return super.create(createDto);
    }
}
