import { IEventRepository } from "src/Core/Domains/Repositories/event.repository";
import { EventCreateInput } from "../Inputs/EventCreateInput";
import { IAreaRepository } from "src/Core/Domains/Repositories/area.repository";
import { IUserRepository } from "src/Core/Domains/Repositories/user.repository";
import { EventModel } from "@domain/Models/event.model";
import { IScheduleRepository } from "@domain/Repositories/schedule.repository";
import { ScheduleWasAlocatedException } from "@app/Errors/ScheduleWasAlocatedExeceptions";
import { WrongOwnerActionExeception } from "@app/Errors/WrongOwnerActionExeception";

export class EventAreaService {
    constructor(
        private readonly eventRepo:IEventRepository,
        private readonly areaRepo:IAreaRepository,
        private readonly userRepo:IUserRepository,
        private readonly scheduleRepo:IScheduleRepository
    ){}

    async create(data:EventCreateInput){
        const area = await this.areaRepo.findById(data.areaId);
        const guest = await this.userRepo.findGuestById(data.ownerId)

        if(!area || !guest)
            throw new Error("Err to create event!")

        const eventModel = new EventModel(data.name,data.type)
            .setArea(area)
            .setGuest(guest.guestId)
        const event = await this.eventRepo.create(eventModel)

        if(await this.scheduleRepo.isValidSchedule(data.schedules))
            throw new ScheduleWasAlocatedException();

        const schedule = await this.scheduleRepo.addSchedulesInEvent(event.id,data.schedules)
        return event.setSchedule(schedule);
    }

    async eventsByArea(areaId:number,ownerId:number){
        const events = await this
            .eventRepo
            .eventsByAreaId(areaId,ownerId);

        return events
    }

    async myEvents(guest:number){
        const events = await this
            .eventRepo
            .eventsByOrganizerId(guest);

        return events
    }

    async update(eventId:number,guest:number,data:any){
        //informacoes base do evento
    }

    async deleteForGuest(eventId:number,userId:number){
        
        if(!await this.eventRepo.isGuestofEvent(userId))
            throw new WrongOwnerActionExeception("This user is not main Guest!")

        if(!await this.eventRepo.delete(eventId))
            throw new Error("Error in delete event")

        await this.scheduleRepo.releaseSchedulesByEvent(eventId)

        return {
            "message":"Event was deleted",
            "status":"sucess"
        }

    }

    async deleteForOwnerArea(eventId:number,userId:number){

        if(!await this.eventRepo.isOwnerOfAreaEvent(userId))
            throw new WrongOwnerActionExeception("This user is not owner for this area!")

        if(!await this.eventRepo.delete(eventId))
            throw new Error("Error in delete event")

        return {
            "message":"Event was deleted",
            "status":"sucess"
        }
    }

}