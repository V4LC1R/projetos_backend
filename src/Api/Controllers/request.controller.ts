import { CreateRequestInputDTO } from '@api/DTO/create-request.dtp';
import { RequestService } from '@app/Services/request.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';

@Controller('request')
export class RequestController {
    constructor(
        private readonly requestService : RequestService
    ){}

    @Get('/my-requests')
    async getEvents(@Req() req) {
         return await this
            .requestService.myRequests(req.user.id)
    }

    @Get('/area-request/:id')
    async getEventsByArea(@Param('id') id,@Req() req) {
        return await this
            .requestService
            .requestByArea(id,req.user.id);
    }

    @Post('/')
    async createEvent(@Req() req, @Body() body:CreateRequestInputDTO) {
        return await this
            .requestService
            .create({...body,ownerId:req.user.id});
    }

    @Put('/owner-acept/id')
    async deleteGuest(@Param('id') id,@Req() req){
        return await this
            .requestService
            .acept(id,req.user.id);
    }

    @Put('/owner-reject/:id')
    async deleteOwnerArea(@Param('id') id,@Req() req){
        return await this
            .requestService
            .reject(id,req.user.id);
    }
}
