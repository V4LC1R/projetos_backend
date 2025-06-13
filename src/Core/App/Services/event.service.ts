import { IEventRepository } from "src/Core/Domains/Repositories/event.repository";
import { EventCreateInput } from "../Inputs/EventCreateInput";
import { IAreaRepository } from "src/Core/Domains/Repositories/area.repository";
import { IUserRepository } from "src/Core/Domains/Repositories/user.repository";
import { EventModel } from "@domain/Models/event.model";

export class EventAreaService {
    constructor(
        private readonly eventRepo:IEventRepository,
        private readonly areaRepo:IAreaRepository,
        private readonly userRepo:IUserRepository
    ){}

    async create(data:EventCreateInput){
        const area = await this.areaRepo.findById(data.areaId);
        const guest = await this.userRepo.findGuestById(data.ownerId)

        if(!area || !guest)
            throw new Error("Err to create event!")

        const eventModel = new EventModel(data.name,data.type)
            .setArea(area.id)
            .setGuest(guest.guestId)
        const event = await this.eventRepo.create(eventModel)
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