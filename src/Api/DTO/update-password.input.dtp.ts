import { IsNotEmpty,NotContains } from "class-validator";

export class UpdatePasswordInputDTO  {
    @IsNotEmpty()
    password: string;
}