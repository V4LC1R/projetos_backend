import { EventTypeEnum } from "src/Core/Domains/Models/event.model";

export class EventCreateInput {
    name: string;
    areaId: number;
    ownerId: number;
    type:EventTypeEnum
    schedules: number[]; 

    constructor(
        name: string,
        areaId: number,
        ownerId: number,
        schedules:number[]
    ) {
        this.name = name;
        this.areaId = areaId;
        this.ownerId = ownerId
        this.schedules = schedules
    }
}