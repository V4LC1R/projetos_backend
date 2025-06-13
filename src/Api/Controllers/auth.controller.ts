import { Body, Controller, Delete, Param, Post, Put, Req } from '@nestjs/common';

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
        return await this
            .userService
            .authenticate(credentials.email,credentials.password);
    }

    @Post('/register')
    async register(@Body() createUserDto:CreateUserInputDTO){
        return await this
            .userService
            .create(createUserDto);
    }

    @Put('/change-password')
    async changePassword(@Req() req, @Body() data:UpdatePasswordInputDTO){
        return await this
            .userService
            .changePassword(req.user.id, data.password);
    }

    @Delete('/')
    async selfDelete(@Req() req, @Body() data:UpdatePasswordInputDTO){
        return await this
            .userService
            .selfDelete(req.user.id);
    }
}
