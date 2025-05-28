import { CreateEventInputDTO } from '@api/DTO/create-event.input.dto';
import { EventAreaService } from '@app/Services/event.service';
import { HTTPErrorFactory } from '@infra/Helper/HTTPErrorFactory';
import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';


@Controller('event')
export class EventController {
    constructor(
            private readonly eventService : EventAreaService
        ){}

    @Get('/')
    async getEvents() {
      
    }

    @Get('/:id')
    async getEventById() {
        // Logic to get an event by ID
        return { message: 'Event details' };
    }

    @Get('/my-events/')
    async getMyEvents() {
        // Logic to get an event by ID
        return { message: 'Event details' };
    }

    @Get('/area-events/:id')
    async getEventsByArea() {
        // Logic to get an event by ID
        return { message: 'Event details' };
    }

    @Post('/')
    async createEvent(@Req() req, @Body() body:CreateEventInputDTO) {
        try {
            return await this
                .eventService
                .create({...body,ownerId:req.user.id});
        } catch (error) {
            console.log(error)
            throw HTTPErrorFactory
                 .INTERNAL_SERVER_ERROR('Error to create event', error)
        }
    }

    @Put('/')
    async updateEvent() {
        // Logic to update an event
        return { message: 'Event updated successfully' };
    }

    @Delete('/')
    async deleteEvent() {
        // Logic to delete an event
        return { message: 'Event deleted successfully' };
    }

}
