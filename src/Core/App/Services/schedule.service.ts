import { IScheduleRepository } from "@domain/Repositories/schedule.repository";
import { ScheduleCreateInput } from "@app/Inputs/ScheduleCreateInput";
import { ScheduleEditInput } from "@app/Inputs/ScheduleEditInput";
import { AvailabilityStatus } from "@domain/Models/schedule.model";

export class ScheduleService {
    constructor(

        private readonly scheduleRepo:IScheduleRepository
    ){}

    async create(data:ScheduleCreateInput){
        
        
    }

    async update(data:ScheduleEditInput){

    }

    async statusChange(eventId:number,ownerAreaId:number,status:AvailabilityStatus){

    }
}