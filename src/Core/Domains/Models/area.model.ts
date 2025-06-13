import { AddressModel } from "./address.model";
import { OwnerModel } from "./owner.model";
import { ScheduleModel } from "./schedule.model";

export class AreaModel {
    id:number
    name: string;
    rent: number;
    createdAt: Date;
    updatedAt: Date;
    ownerId:number
    address:AddressModel
    schedule:ScheduleModel[]

    constructor(name: string, rent: number, createdAt: Date, updatedAt: Date) {
        this.name = name;
        this.rent = rent;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    setId(id:number){
        this.id = id
        return this
    }

    setOwner(ownerId: number) {
        this.ownerId = ownerId
        return this
    }

    setSchedule(schedule: ScheduleModel[]) {
        this.schedule = schedule
        return this
    }

    setAddress(address: AddressModel){
        this.address = address

        return this
    }

}