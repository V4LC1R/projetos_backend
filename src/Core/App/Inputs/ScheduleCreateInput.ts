import { AddressCreateInput } from "./AddressCreateInput";

export class ScheduleCreateInput {
    start_time: Date;
    end_time: Date;
    date:Date
   

    constructor(
        start_time: Date,
        end_time: Date,
        date:Date
    ) {
        this.start_time = start_time;
        this.end_time = end_time;
        this.date = date
    }
}