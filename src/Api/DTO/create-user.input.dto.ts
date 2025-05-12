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
    @Matches(/^\(\d{2}\)\s9\d{4}-\d{4}$/, {
        message: 'Telefone inválido. Exemplo válido: (11) 91234-5678',
    })
    cellphone: string;
}