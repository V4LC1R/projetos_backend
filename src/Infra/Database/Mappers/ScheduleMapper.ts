 // se precisar mapear área

import { ScheduleModel } from "@domain/Models/schedule.model";
import { Schedule } from "../Schemas/schedule.schema";
import { Area } from "../Schemas/area.schema";

export class ScheduleMapper {

  static toDomain(schedule: Schedule): ScheduleModel {
    console.log(schedule)
    const model = new ScheduleModel(
      schedule.start_time,
      schedule.end_time,
      schedule.date,
      schedule.id,
    );

    if(schedule.area)
      model.setAreaId(schedule.area.id)
  
    return model
  }

static toORM(domain: ScheduleModel): Schedule {
  const orm = new Schedule();

  if (domain.id) orm.id = domain.id;

  orm.start_time = ScheduleMapper.formatToDate(domain.start_time);
  orm.end_time = ScheduleMapper.formatToDate(domain.end_time);
  orm.date = ScheduleMapper.formatToDate(domain.date);

  orm.status = orm.status ?? 'unavailable';
  orm.area = { id: domain.areaId } as Area;

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
