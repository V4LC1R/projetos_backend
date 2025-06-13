import { CreateAreaInputDto } from '@api/DTO/create-area.input.dto';
import { FindByCoordinatesDto } from '@api/DTO/get-areaByCoordinates';
import { UpdateAreaInputDto } from '@api/DTO/update-area.input.dto';
import { AreaService } from '@app/Services/area.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';

@Controller('area')
export class AreaController {

    constructor(
        private readonly areaService : AreaService
    ){}

    @Post('/')
    async store(@Request() req, @Body() areaDto:CreateAreaInputDto){
        return await this
            .areaService
            .create(req.user.id,areaDto);
    }

    @Put('/:id')
    async update(@Param('id') id, @Request() req, @Body() areaDto:UpdateAreaInputDto){
        return await this
            .areaService
            .edit(id,req.user.id,areaDto)
    }

    @Get('/my-areas')
    async getByOwner(@Request() req){
        return await this
            .areaService
            .getAllByOwner(req.user.id);
    }

    @Get('/:id')
    async show(@Param('id') id){
        return await this
            .areaService
            .getById(id);
    }

    @Delete('/:id')
    async delete(@Param('id') id,@Request() req){
        return await this
            .areaService
            .delete(id,req.user.id);
    }

    @Get('/by-position')
    async getByPosition(@Query() query: FindByCoordinatesDto){
        return await this
            .areaService
            .getByPosition(query.lat, query.lng, query.distance,query.categoryId);
    }

}
