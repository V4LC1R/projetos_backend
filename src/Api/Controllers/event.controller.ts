import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('event')
export class EventController {
    @Get('/')
    async getEvents() {
        // Logic to get all events
        return { message: 'List of events' };
    }

    @Get('/:id')
    async getEventById() {
        // Logic to get an event by ID
        return { message: 'Event details' };
    }

    @Post('/')
    async createEvent() {
        // Logic to create an event
        return { message: 'Event created successfully' };
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
