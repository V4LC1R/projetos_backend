import { AreaModel } from "./area.model";
import { GuestModel } from "./guest.model";
import { ScheduleModel } from "./schedule.model";
import { UserModel } from "./user.model";

export enum EventTypeEnum{
    SIMPLE = 1,
    TOURNAMENT = 2,
    PARTY = 3
}

export class EventModel {
    id:number;
    name:string
    areaId:number
    guestId:number
    type:EventTypeEnum
    schedule:ScheduleModel[]

    constructor(
        name:string,
        type:EventTypeEnum,
    ){
        this.name = name;
        this.type = type;
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

    setGuest(guestId: number){
        this.guestId = guestId
        return this;
    }
}