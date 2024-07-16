import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { UserRo } from './ros/user.ro';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<UserRo>;
    findAll(): Promise<UserRo[]>;
    findById(id: string): Promise<UserRo>;
    updateById(id: string, updateUserDto: UpdateUserDto): Promise<UserRo>;
    deleteById(id: string): Promise<void>;
}
