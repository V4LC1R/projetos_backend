import { IEventRepository } from "src/Core/Domains/Repositories/event.repository";
import { EventCreateInput } from "../Inputs/EventCreateInput";
import { IAreaRepository } from "src/Core/Domains/Repositories/area.repository";
import { IUserRepository } from "src/Core/Domains/Repositories/user.repository";

export class EventAreaService {
    constructor(
        private readonly eventRepo:IEventRepository,
        private readonly areaRepo:IAreaRepository,
        private readonly userRepo:IUserRepository
    ){}

    async create(data:EventCreateInput){
        const area = await this.areaRepo.findById(data.areaId);
        const owner = await this.userRepo.findById(data.ownerId)
        const { areaId,ownerId,...eventData} = data
        const event = await this.eventRepo.create({area,owner,event:eventData})
        return event;
    }

    async eventsByArea(areaId:number,ownerId:number){
        const events = await this
            .eventRepo
            .eventsByAreaId(areaId,ownerId);

        return events
    }

    async myEvents(areaId:number,ownerId:number){
        const events = await this
            .eventRepo
            .eventsByOrganizerId(ownerId);

        return events
    }
}