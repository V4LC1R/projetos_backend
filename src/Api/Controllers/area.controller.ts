import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CreateAreaInputDto } from 'src/Api/DTO/create-area.input.dto';
import { AreaService } from 'src/Core/App/Services/area.service';
import { AreaRepositoryTypeORM } from 'src/Infra/Database/Repositories/area.repository-typeorm';

import { HTTPErrorFactory } from 'src/Infra/Helper/HTTPErrorFactory';

@Controller('area')
export class AreaController {

    constructor(
        private readonly areaService : AreaService
    ){}

    @Post('/')
    async store(@Request() req, @Body() areaDto:CreateAreaInputDto){
        try {
            return await this
                .areaService
                .create(req.user.id,areaDto);
        } catch (error) {
            console.log(error)
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to create area', error)
        }
    }

    @Get('/my-areas')
    async getByOwner(@Request() req){
        try{
            return await this
                .areaService
                .getAllByOwner(req.user.id);
        }catch(error){
            console.log(error)
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to get areas', error)
        }
    }

    @Get('/by-position')
    async getByPosition(@Param() param){
        try{
            return await this
                .areaService
                .getByPosition(param.lat, param.lng, param.distance);
        }catch(error){
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to get areas', error)
        }
    }

}
