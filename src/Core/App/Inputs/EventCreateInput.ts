import { EventTypeEnum } from "src/Core/Domains/Models/event.model";

export class EventCreateInput {
    name: string;
    areaId: number;
    ownerId: number;
    type:EventTypeEnum

    constructor(
        name: string,
        areaId: number,
        ownerId: number
    ) {
        this.name = name;
        this.areaId = areaId;
        this.ownerId = ownerId
    }
}