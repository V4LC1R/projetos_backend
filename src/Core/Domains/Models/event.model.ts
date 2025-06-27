import { AreaModel } from "./area.model";
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

export class EventModel {
    id:number;
    name:string
    area:AreaModel
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

    setArea(area: AreaModel){
        this.area = area
        return this;
    }

    setGuest(guestId: number){
        this.guestId = guestId
        return this;
    }
}