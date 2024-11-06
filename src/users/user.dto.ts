import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class RegisterUserDataObject {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}