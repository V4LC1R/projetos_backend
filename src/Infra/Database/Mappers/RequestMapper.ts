import { ScheduleMapper } from "./ScheduleMapper";
import { Area } from "../Schemas/area.schema";
import { User } from "../Schemas/user.schema";
import { RequestModel } from "@domain/Models/request.model";
import { Request } from "../Schemas/request.schema";

export class RequestMapper {
  static toDomain(event: Request): RequestModel {
    const model = new RequestModel(event.message, );

    if(event.id)
      model.setId(event.id)

    if (event.area) {
      model.setArea(event.area.id);
    }

    if (event.owner) {
      model.setGuest(event.owner.id);
    }

    if (event.schedules && event.schedules.length > 0) {
      model.setSchedule(event.schedules.map(s => ScheduleMapper.toDomain(s)));
    }

    return model;
  }

  static toORM(domain: RequestModel): Request {
    const entity = new Request();

    entity.id = domain.id;
    entity.message = domain.message;
    entity.createdAt = new Date(); // ou manter null e deixar o TypeORM criar
    entity.updatedAt = new Date();

    if (domain.areaId) {
      entity.area = {id:domain.areaId} as Area;
    }

    if (domain.ownerId) {
      entity.owner ={id:domain.ownerId} as User; // Guest é um tipo de User
    }

    if(domain.schedule && domain.schedule.length > 0){
        entity.schedules = domain.schedule.map(s=>ScheduleMapper.toORM(s))
    }

    return entity;
  }
}
