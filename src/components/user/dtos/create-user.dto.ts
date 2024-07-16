import { IsString, IsEmail, IsInt, Min, Max, Length, IsObject } from 'class-validator';

export class CreateUserDto {
    @IsString()
    loginUuid: string;

    @IsString()
    title: string;

    @IsString()
    @Length(1, 50)
    first: string;

    @IsString()
    @Length(1, 50)
    last: string;

    @IsString()
    gender: string;

    @IsString()
    country: string;

    @IsString()
    phone: string;

    @IsEmail()
    email: string;

    @IsObject()
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };

    @IsInt()
    @Min(0)
    @Max(120)
    age: number;

    @IsString()
    dob: string;

    @IsString()
    street: string;

    @IsString()
    city: string;

    @IsString()
    state: string;
}
