
export enum AvailabilityStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  RESERVED = 'reserved',
}


export class ScheduleModel {
    start_time: Date;
    end_time: Date;
    status:AvailabilityStatus
    date:Date
    id:number = 0;
    areaId:number
    eventId:number
   
    constructor(start_time: string | Date, end_time: string | Date, date: string | Date, id?: number) {
        this.start_time = new Date(start_time);
        this.end_time = new Date(end_time);
        this.date = new Date(date);
        this.id = id ?? 0
    }

    setAreaId(id:number){
        this.areaId = id
        return this
    }

    setEventId(id:number){
        this.eventId = id
        return this
    }
}