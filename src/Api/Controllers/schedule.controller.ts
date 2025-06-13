import { CreateEventInputDTO } from '@api/DTO/create-event.input.dto';
import { UpdateEventStatusInputDTO } from '@api/DTO/update-eventStatus.dto';
import { UpdatePasswordInputDTO } from '@api/DTO/update-password.input.dtp';
import { ScheduleService } from '@app/Services/schedule.service';

import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';


@Controller('schedule')
export class ScheduleController {
    constructor(
        private readonly eventService : ScheduleService
    ){}

    @Patch('/:id')
    async updateStatus(@Param('id') id:number,@Req() req,@Body() body:UpdateEventStatusInputDTO){
        return await this
            .eventService
            .statusChange(id,req.user.id,body.type)
    }

}
