import { CreateAreaInputDto } from '@api/DTO/create-area.input.dto';
import { AreaService } from '@app/Services/area.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';


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

    @Put('/')
    async update(@Param('id') id, @Request() req, @Body() areaDto:CreateAreaInputDto){
        try {
            return await this
                .areaService
                .edit(id,req.user.id,areaDto);
        } catch (error) {
            console.log(error)
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to create area', error)
        }
    }

    @Get('/')
    async show(@Param('id') id){
        try{
            return await this
                .areaService
                .getById(id);
        }catch(error){
            console.log(error)
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to get areas', error)
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
    async getByPosition(@Query("lat") lat,@Query("lng") lng, @Query("distance") distance){
        try{
            return await this
                .areaService
                .getByPosition(lat, lng, distance);
        }catch(error){
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to get areas', error)
        }
    }

}
