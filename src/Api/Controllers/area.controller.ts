import { Body, Controller, Delete, Get, Post, Put, Request } from '@nestjs/common';
import { CreateAreaInputDto } from 'src/Api/DTO/create-area.input.dto';
import { AreaService } from 'src/Core/App/Services/area.service';

import { HTTPErrorFactory } from 'src/Infra/Helper/HTTPErrorFactory';

@Controller('area')
export class AreaController {

    constructor(
        private readonly areaService : AreaService
    ){}

    @Post('/')
    async store(@Body() areaDto:CreateAreaInputDto){
        
       try {
            return await this.areaService
                .create(areaDto);
       } catch (error) {
            throw HTTPErrorFactory
                .INTERNAL_SERVER_ERROR('Error to create area', error)
        }
    }

    // @Get('/:id')
    // async getAreaById() {
    //     // Logic to get an Area by ID
    //     return { message: 'Area details' };
    // }
    // @Put('/')
    // async updateArea() {
    //     // Logic to update an Area
    //     return { message: 'Area updated successfully' };
    // }

    // @Delete('/')
    // async deleteArea() {
    //     // Logic to delete an Area
    //     return { message: 'Area deleted successfully' };
    // }

}
