export class ScheduleEditInput {
    start_time: Date;
    end_time: Date;
    date:Date
    id:number

    constructor(
        id:number,
        start_time: Date,
        end_time: Date,
        date:Date
    ) {
        this.id = id
        this.start_time = start_time;
        this.end_time = end_time;
        this.date = date
    }
}