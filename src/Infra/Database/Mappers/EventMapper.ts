import { AreaMapper } from './AreaMapper';
import { EventModel } from "@domain/Models/event.model";
import { Event } from "../Schemas/event.schema";
import { ScheduleMapper } from "./ScheduleMapper";
import { Area } from "../Schemas/area.schema";
import { User } from "../Schemas/user.schema";

export class EventMapper {
  static toDomain(event: Event): EventModel {
    const model = new EventModel(event.name, event.type);

    if(event.id)
      model.setId(event.id)

    if (event.area) {
      model.setArea(AreaMapper.toDomain(event.area));
    }

    if (event.owner) {
      model.setGuest(event.owner.id);
    }

    console.log(event.schedules)

    if (event.schedules && event.schedules.length > 0) {
      model.setSchedule(event.schedules.map(s => ScheduleMapper.toDomain(s)));
    }

    return model;
  }

  static toORM(domain: EventModel): Event {
    const entity = new Event();

    entity.id = domain.id;
    entity.name = domain.name;
    entity.type = domain.type;
    entity.createdAt = new Date(); // ou manter null e deixar o TypeORM criar
    entity.updatedAt = new Date();

    if (domain.schedule && domain.schedule.length > 0) {
      entity.schedules = domain.schedule.map(s => ScheduleMapper.toORM(s));
    }

    if (domain.area) {
      entity.area = {id:domain.area.id} as Area;
    }

    if (domain.guestId) {
      entity.owner ={id:domain.guestId} as User; // Guest é um tipo de User
    }

    return entity;
  }
}
