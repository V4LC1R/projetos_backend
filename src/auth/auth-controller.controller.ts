import { Body, Controller, Post, HttpException,HttpStatus } from '@nestjs/common';
import { CreateUserInputDTO } from 'src/Core/App/DTO/create-user.input.dto';
import { UserService } from 'src/Core/App/Services/user.service';

@Controller('auth')
export class AuthControllerController {
    constructor(
        private readonly userService : UserService
    ){}

    @Post('/')
    async login(@Body() createUserDto:CreateUserInputDTO){
        try {
            return await this.userService.create(createUserDto);
        } catch (error) {
            throw new HttpException({
                status:HttpStatus.INTERNAL_SERVER_ERROR,
                message:'Erro ao criar usuario!'
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            {
                cause:error
            }
            )
        }
    }
}
