import { ScheduleMapper } from "./ScheduleMapper";
import { Area } from "../Schemas/area.schema";
import { User } from "../Schemas/user.schema";
import { RequestModel } from "@domain/Models/request.model";
import { Request } from "../Schemas/request.schema";
import { AreaMapper } from "./AreaMapper";
import { UserMapper } from "./UserMapper";

export class RequestMapper {
  static toDomain(event: Request): RequestModel {
    const model = new RequestModel(event.message, );

    if(event.id)
      model.setId(event.id)

    if (event.area) {
      model.setArea(AreaMapper.toDomain(event.area));
    }

    if (event.owner) {
      model.setGuest(UserMapper.toGuestDomain(event.owner));
    }

    if (event.schedules && event.schedules.length > 0) {
      model.setSchedule(event.schedules.map(s => ScheduleMapper.toDomain(s)));
    }

    model
      .setStatus(event.status)
      .setNameEvent(event.nameEvent || "S/N"); // Default value if not provided

    return model;
  }

  static toORM(domain: RequestModel): Request {
    const entity = new Request();

    entity.id = domain.id;
    entity.message = domain.message;
    entity.nameEvent = domain.nameEvent || "S/N"; // Default value if not provided
    entity.status = domain.status;
    entity.createdAt = new Date(); // ou manter null e deixar o TypeORM criar
    entity.updatedAt = new Date();

    if (domain.area) {
      entity.area = {id:domain.area.id} as Area;
    }

    if (domain.owner) {
      entity.owner ={id:domain.owner.id} as User; // Guest é um tipo de User
    }

    if(domain.schedule && domain.schedule.length > 0){
        entity.schedules = domain.schedule.map(s=>ScheduleMapper.toORM(s))
    }

    return entity;
  }
}
