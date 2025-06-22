export class RequestCreateInput {
    message: string;
    areaId: number;
    ownerId: number;
    schedules: number[]; 

    constructor(
        message: string,
        areaId: number,
        ownerId: number,
        schedules:number[]
    ) {
        this.message = message;
        this.areaId = areaId;
        this.ownerId = ownerId
        this.schedules = schedules
    }
}