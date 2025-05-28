import { Body, Controller, Param, Post, Put, Req } from '@nestjs/common';

import { AuthUserInputDTO } from '@api/DTO/auth-user.input.dto';
import { CreateUserInputDTO } from '@api/DTO/create-user.input.dto';
import { UpdatePasswordInputDTO } from '@api/DTO/update-password.input.dtp';
import { UserService } from '@app/Services/user.service';
import { Exception } from '@shared/Exceptions';
import { HTTPErrorFactory } from '@infra/Helper/HTTPErrorFactory';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService : UserService
    ){}

    @Post('/')
    async auth(@Body() credentials:AuthUserInputDTO){
        try {
            return await this
                .userService
                .authenticate(credentials.email,credentials.password);
        } catch (error) {
            throw HTTPErrorFactory
                .UNAUTHORIZED('User UNAUTHORIZED',error)
        }
    }

    @Post('/register')
    async register(@Body() createUserDto:CreateUserInputDTO){
        try {
            return await this
                .userService
                .create(createUserDto);
        } catch (error:Exception | any) {
             throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to create user', error)
        }
    }

    @Put('/change-password')
    async changePassword(@Req() req, @Body() data:UpdatePasswordInputDTO){
        try {

            console.log(req.user,data)
            return await this
                .userService
                .changePassword(req.user.id, data.password);
        } catch (error) {
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to change password', error)
        }
    }
}
