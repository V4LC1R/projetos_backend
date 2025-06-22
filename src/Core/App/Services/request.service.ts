import { RequestCreateInput } from "@app/Inputs/RequestCreateInput";
import { EventCreateInput } from "../Inputs/EventCreateInput";
import { IRequestRepository } from "@domain/Repositories/request.repository";
import { IAreaRepository } from "@domain/Repositories/area.repository";
import { IUserRepository } from "@domain/Repositories/user.repository";
import { RequestModel } from "@domain/Models/request.model";
import { ScheduleBuilder } from "@domain/Builders/ScheduleBuilder";
import { IScheduleRepository } from "@domain/Repositories/schedule.repository";

export class RequestService {
    constructor(
        private readonly requestRepo:IRequestRepository,
        private readonly areaRepo:IAreaRepository,
        private readonly userRepo:IUserRepository,
    ){}

    async create(data:RequestCreateInput){
        const area = await this.areaRepo.findById(data.areaId);
    
        const guest = await this.userRepo.findGuestById(data.ownerId)

        if(!area || !guest)
            throw new Error("Area or guest not found!")

        const schedules = data.schedules.map(e=>new ScheduleBuilder().fill({id:e}))

        const requestModel = new RequestModel(data.message)
            .setArea(data.areaId)
            .setGuest(data.ownerId)
            .setSchedule(schedules)

        const request = await this.requestRepo.create(requestModel)

        return request

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