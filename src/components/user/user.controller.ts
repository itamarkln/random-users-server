import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { UserRo } from './ros/user.ro';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserRo> {
        const user = await this.userService.create(createUserDto);
        return plainToInstance(UserRo, user);
    }

    @Get()
    async findAll(): Promise<UserRo[]> {
        const users = await this.userService.find();
        return plainToInstance(UserRo, users);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<UserRo> {
        const user = await this.userService.findById(id);
        return plainToInstance(UserRo, user);
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserRo> {
        const updatedUser = this.userService.findByIdAndUpdate(id, updateUserDto);
        return plainToInstance(UserRo, updatedUser);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string): Promise<void> {
        return this.userService.findByIdAndDelete(id);
    }
}
