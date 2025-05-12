import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthUserInputDTO
{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}