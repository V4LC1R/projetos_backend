export class RequestCreateInput {
    message: string;
    areaId: number;
    ownerId: number;
    schedules: number[]; 
    nameEvent?: string; 

    constructor(
        message: string,
        areaId: number,
        ownerId: number,
        schedules:number[],
        nameEvent?: string
    ) {
        this.message = message;
        this.areaId = areaId;
        this.ownerId = ownerId
        this.schedules = schedules
        this.nameEvent = nameEvent;
    }
}