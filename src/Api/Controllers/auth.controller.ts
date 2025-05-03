import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AuthUserInputDTO } from 'src/Api/DTO/auth-user.input.dto';
import { CreateUserInputDTO } from 'src/Api/DTO/create-user.input.dto';
import { UpdatePasswordInputDTO } from 'src/Api/DTO/update-password.input.dtp';
import { UserService } from 'src/Core/App/Services/user.service';

import { HTTPErrorFactory } from 'src/Infra/Helper/HTTPErrorFactory';

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
        } catch (error) {
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to create user', error)
        }
    }

    @Put('/change-password')
    async changePassword(@Body() data:UpdatePasswordInputDTO){
        try {
            return await this
                .userService
                .changePassword(data.userId, data.password);
        } catch (error) {
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to change password', error)
        }
    }
}
