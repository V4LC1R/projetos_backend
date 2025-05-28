export enum EventTypeEnum{
    SIMPLE = 1,
    TOURNAMENT = 2,
    PARTY = 3
}

export class EventModel {
    id?:number;
    name:string
    type:EventTypeEnum

    constructor(
        name:string,
        type:EventTypeEnum,
        id?:number
    ){

    }
}