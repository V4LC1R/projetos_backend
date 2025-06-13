
import { ScheduleModel } from "@domain/Models/schedule.model";
import { IBaseRepository } from "./base.repository";

export interface IScheduleRepository extends IBaseRepository<ScheduleModel> {
    bulkInsert(schedules:ScheduleModel[]):Promise<ScheduleModel[]>
    addSchedulesInEvent(eventId:number,schedules:number[]):Promise<ScheduleModel[]>
    isValidSchedule(schedules:number[]):Promise<boolean>
}