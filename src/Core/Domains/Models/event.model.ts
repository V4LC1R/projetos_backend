import { AreaModel } from "./area.model";
import { GuestModel } from "./guest.model";

export enum EventTypeEnum{
    SIMPLE = 1,
    TOURNAMENT = 2,
    PARTY = 3
}

export class EventModel {
    id?:number;
    name:string
    type:EventTypeEnum
    area:AreaModel
    guest:GuestModel

    constructor(
        name:string,
        type:EventTypeEnum,
        id?:number
    ){
        this.name = name;
        this.type = type;
        this.id = id;
    }

    setArea(area: AreaModel){
        this.area = area
        return this;
    }

    setGuest(guest: GuestModel){
        this.guest = guest
        return this;
    }
}