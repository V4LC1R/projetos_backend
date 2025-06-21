import { CreateEventInputDTO } from '@api/DTO/create-event.input.dto';
import { EventAreaService } from '@app/Services/event.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';

@Controller('request')
export class EventController {
    constructor(
        private readonly eventService : EventAreaService
    ){}

    @Get('/my-requests')
    async getEvents(@Req() req) {
         return await this
            .eventService.myEvents(req.user.id)
    }

    @Get('/area-request/:id')
    async getEventsByArea(@Param('id') id,@Req() req) {
        return await this
            .eventService
            .eventsByArea(id,req.user.id);
    }

    @Post('/')
    async createEvent(@Req() req, @Body() body:CreateEventInputDTO) {
        return await this
            .eventService
            .create({...body,ownerId:req.user.id});
    }

    @Put('/:id')
    async update(@Param('id') id:number, @Req() req, @Body() body:CreateEventInputDTO) {
        return await this
            .eventService
            .update(id,req.user.id,{...body});
    }

    @Delete('/guest/:id')
    async deleteGuest(@Param('id') id,@Req() req){
        return await this
            .eventService
            .deleteForGuest(id,req.user.id);
    }

    @Delete('/owner-request/:id')
    async deleteOwnerArea(@Param('id') id,@Req() req){
        return await this
            .eventService
            .deleteForOwnerArea(id,req.user.id);
    }
}
