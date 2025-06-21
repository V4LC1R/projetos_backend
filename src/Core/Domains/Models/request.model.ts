import { ScheduleModel } from "./schedule.model";

export enum EventTypeEnum{
    SIMPLE = 1,
    TOURNAMENT = 2,
    PARTY = 3
}

export enum EventStatusEnum{
    ACTIVE = 1,
    INACTIVE = 2
}

export class RequestModel {
    id:number;
    message:string
    areaId:number
    ownerId:number
    schedule:ScheduleModel[]

    constructor(
        message:string,
    ){
        this.message = message;
    }

    setId(id:number){
        this.id =id
        return this
    }

    setSchedule(schedule:ScheduleModel[]){
        this.schedule =schedule
        return this
    }

    setArea(areaId: number){
        this.areaId = areaId
        return this;
    }

    setGuest(ownerId: number){
        this.ownerId = ownerId
        return this;
    }
}