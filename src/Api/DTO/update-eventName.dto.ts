import { EventTypeEnum } from "src/Core/Domains/Models/event.model";

export class UpdateEventNameDTO {
    name: string;
    ownerId: number;
    eventId:number

    constructor(
        name: string,
        eventId:number,
        ownerId: number
    ) {
        this.name = name;
        this.eventId =eventId
        this.ownerId = ownerId
    }
}