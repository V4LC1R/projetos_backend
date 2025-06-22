import { AvailabilityStatus, ScheduleModel } from "@domain/Models/schedule.model";

export class ScheduleBuilder {
  private startTimeValue: Date;
  private endTimeValue: Date;
  private dateValue: Date;
  private statusValue: AvailabilityStatus = AvailabilityStatus.AVAILABLE;
  private idValue: number = 0;
  private areaIdValue: number;
  private eventIdValue: number;

  startTime(date: string | Date) {
    this.startTimeValue = new Date(date);
    return this;
  }

  endTime(date: string | Date) {
    this.endTimeValue = new Date(date);
    return this;
  }

  date(date: string | Date) {
    this.dateValue = new Date(date);
    return this;
  }

  status(status: AvailabilityStatus) {
    this.statusValue = status;
    return this;
  }

  id(id: number) {
    this.idValue = id;
    return this;
  }

  areaId(id: number) {
    this.areaIdValue = id;
    return this;
  }

  eventId(id: number) {
    this.eventIdValue = id;
    return this;
  }

  /**
   * 🚀 Preenche todos os dados de uma vez
   */
  fill(data: Partial<ScheduleModel>) {

    this.startTimeValue = data.start_time ? new Date(data.start_time) :  new Date()
    this.endTimeValue = data.end_time ? new Date(data.end_time) :  new Date();
    this.dateValue =data.date ? new Date(data.date) : new Date();
  
    if (data.status) this.statusValue = data.status;
    if (data.id !== undefined) this.idValue = data.id;
    if (data.areaId !== undefined) this.areaIdValue = data.areaId;
    if (data.eventId !== undefined) this.eventIdValue = data.eventId;
    return this.build();
  }

  build() {
    const schedule = new ScheduleModel(
      this.startTimeValue,
      this.endTimeValue,
      this.dateValue,
      this.idValue
    );

    schedule.status = this.statusValue;
    schedule.setAreaId(this.areaIdValue);
    schedule.setEventId(this.eventIdValue);

    return schedule;
  }
}
