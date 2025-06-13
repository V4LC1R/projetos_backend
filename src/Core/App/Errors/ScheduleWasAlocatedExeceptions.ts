import { Exception } from "src/Core/Shared/Exceptions";

export class ScheduleWasAlocatedException extends Exception {
    constructor(message?:string){
        super(message ?? "This schedules was alocated!",400)
    }
}