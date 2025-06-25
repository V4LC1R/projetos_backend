import { ScheduleModel } from "./schedule.model";
import { AreaModel } from "./area.model";
import { UserModel } from "./user.model";

export enum StatusRequestEnum {
    AWAIT= 0,
    ACEPT= 1,
    REJECT=2,
    CANCELED=3
}

export class RequestModel {
    id:number;
    message:string
    area:AreaModel
    owner:UserModel
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

    setArea(area: AreaModel){
        this.area = area
        return this;
    }

    setGuest(owner: UserModel){
        this.owner = owner
        return this;
    }
}