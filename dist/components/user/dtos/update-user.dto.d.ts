import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Omit<Partial<CreateUserDto>, "loginUuid">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
