import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUserInputDTO  {

    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    cellphone: string;
}