import { ScheduleModel } from "./schedule.model";

export enum StatusRequestEnum {
    AWAIT= 0,
    ACEPT= 1,
    REJECT=2,
    CANCELED=3
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