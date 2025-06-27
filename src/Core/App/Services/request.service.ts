import { RequestCreateInput } from "@app/Inputs/RequestCreateInput";
import { EventCreateInput } from "../Inputs/EventCreateInput";
import { IRequestRepository } from "@domain/Repositories/request.repository";
import { IAreaRepository } from "@domain/Repositories/area.repository";
import { IUserRepository } from "@domain/Repositories/user.repository";
import { RequestModel } from "@domain/Models/request.model";
import { ScheduleBuilder } from "@domain/Builders/ScheduleBuilder";
import { IScheduleRepository } from "@domain/Repositories/schedule.repository";
import { IEventRepository } from "@domain/Repositories/event.repository";
import { EventModel, EventTypeEnum } from "@domain/Models/event.model";

export class RequestService {
    constructor(
        private readonly requestRepo:IRequestRepository,
        private readonly eventRepo:IEventRepository,
        private readonly areaRepo:IAreaRepository,
        private readonly userRepo:IUserRepository,
        private readonly scheduleRepo:IScheduleRepository
    ){}

    async create(data:RequestCreateInput){
        const area = await this.areaRepo.findById(data.areaId);
    
        const guest = await this.userRepo.findGuestById(data.ownerId)

        if(!area || !guest)
            throw new Error("Area or guest not found!")

        const schedules = data.schedules.map(e=>new ScheduleBuilder().fill({id:e}))

        const requestModel = new RequestModel(data.message)
            .setNameEvent(data.nameEvent ?? "S/N")
            .setArea(area)
            .setGuest(guest)
            .setSchedule(schedules)

        const request = await this.requestRepo.create(requestModel)

        return request

    }   

    async get(requestId:number){
        return await this.requestRepo.findById(requestId)
    }

    async toOwner(ownerId:number){
        return await this.requestRepo.toOwner(ownerId)
    }

    async myRequests(userId:number){
        return await this.requestRepo.myRequests(userId)
    }

    async requestByArea(areaId:number,ownerAreaId:number){
        return await this.requestRepo.requestByAreaId(areaId,ownerAreaId)
    }

    async requestMyAreas(ownerAreaId:number){
        return await this.requestRepo.requestMyAreas(ownerAreaId)
    }

    async delete(requestId:number){
         //validar se o dono da area esta realizando o reject

        await this.requestRepo.delete(requestId)
        return {
            "message":"Request was deleted"
        }
    }

    async acept(requestId:number,ownerAreaId:number){
         //validar se o dono da area esta realizando o acept
        await this.requestRepo.aceptRequest(requestId)
        const request = await this.requestRepo.findById(requestId);

        if(!request || !request.area && !request.owner || !request.owner.id )
            throw new Error("Request not found")

        
        const event = new EventModel(request.nameEvent,EventTypeEnum.SIMPLE)
            .setArea(request.area)
            .setGuest(request.owner.id)
            .setSchedule(request.schedule)

        await this.scheduleRepo.addSchedulesInEvent(event.id,request.schedule.map(s=>s.id))

        await this.eventRepo.create(event)
        return {
            "message":"Request was acept"
        }
    }

    async reject(requestId:number,ownerAreaId:number){

        //validar se o dono da area esta realizando o reject

        if(!await this.requestRepo.rejectRequest(requestId))
            throw new Error("Someting is wrong in reject request")

        return {
            "message":"Request was reject"
        }
    }

}