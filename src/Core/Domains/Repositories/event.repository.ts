import { AreaModel } from "../Models/area.model";
import { EventModel } from "../Models/event.model";
import { IBaseRepository } from "./base.repository";

export interface IEventRepository extends IBaseRepository<EventModel> {
    eventsByAreaId(areaId,ownerId):Promise<EventModel[]>
    eventsByOrganizerId(organizerId:number):Promise<EventModel[]>
}