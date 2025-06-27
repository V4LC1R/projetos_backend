export enum AvailabilityStatus {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable',
    RESERVED = 'reserved',
  }
  
  export class ScheduleModel {
    start_time: Date;
    end_time: Date;
    date: Date;
    status: AvailabilityStatus;
    id: number = 0;
    areaId: number;
    eventId: number;
  
    constructor(
      start_time: string | Date,
      end_time: string | Date,
      date: string | Date,
      id?: number
    ){
      this.start_time = ScheduleModel.ensureDate(start_time);
      this.end_time = ScheduleModel.ensureDate(end_time);
      this.date = ScheduleModel.ensureDate(date);
      this.id = id ?? 0;
    }
  
    static ensureDate(input: string | Date): Date {
      return input instanceof Date ? input : new Date(input);
    }
  
    setAreaId(id: number) {
      this.areaId = id;
      return this;
    }
  
    setEventId(id: number) {
      this.eventId = id;
      return this;
    }
  }
  