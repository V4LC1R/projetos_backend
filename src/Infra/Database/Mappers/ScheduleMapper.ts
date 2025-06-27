 // se precisar mapear área

import { AvailabilityStatus, ScheduleModel } from "@domain/Models/schedule.model";
import { Schedule } from "../Schemas/schedule.schema";
import { Area } from "../Schemas/area.schema";
import { Event } from "../Schemas/event.schema";

export class ScheduleMapper {

  static toDomain(schedule: Schedule): ScheduleModel {

    const model = new ScheduleModel(
      schedule.start_time,
      schedule.end_time,
      schedule.date,
      schedule.id,
    );

    if(schedule.area)
      model.setAreaId(schedule.area.id)

    if(schedule.event)
      model.setEventId(schedule.event.id)
  
    return model
  }

static toORM(domain: ScheduleModel): Schedule {
  const orm = new Schedule();

  if (domain.id) orm.id = domain.id;

  if(domain.start_time)
    orm.start_time = ScheduleMapper.formatToDate(domain.start_time);
  if(domain.end_time)
    orm.end_time = ScheduleMapper.formatToDate(domain.end_time);
  if(domain.start_time)
    orm.date = ScheduleMapper.formatToDate(domain.date);

  if(orm.status)
    orm.status = orm.status ?? AvailabilityStatus.AVAILABLE;
  
  orm.area = { id: domain.areaId } as Area;

  if(domain.eventId)
    orm.event = {id:domain.eventId} as Event

  return orm;
}

static formatToTime(value: Date): string {
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new Error(`Invalid Date for time: ${value}`);
  }
  return value.toISOString().substring(11, 19); // HH:mm:ss
}

static formatToDate(value: Date): string {
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new Error(`Invalid Date for date: ${value}`);
  }
  return value.toISOString(); // YYYY-MM-DD
}
}
