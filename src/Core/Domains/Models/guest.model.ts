import { EventModel } from "./event.model";
import { UserModel } from "./user.model"

export class GuestModel extends UserModel{
    events?:EventModel[]

    constructor(name:string, email:string, password:string,id:number = 0,cellphone?:string) {
        super(name, email, password, id, cellphone);
    }

    setNewArea(area: EventModel) {

        if(!this.events)
            this.events = [];
        this.events.push(area);
        return this
    }

    getEvent(): EventModel[] {
        return this.events ?? [];
    }
}