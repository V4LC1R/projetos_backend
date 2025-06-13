import { AddressCreateInput } from "./AddressCreateInput";
import { ScheduleCreateInput } from "./ScheduleCreateInput";

export class AreaCreateInput {
    name: string;
    rent: number;
    address:AddressCreateInput
    schedule:ScheduleCreateInput[]
    categories:number[]

    constructor(
        name: string,
        rent: number,
        address:AddressCreateInput,
        schedule:ScheduleCreateInput[]
    ) {
        this.name = name;
        this.rent = rent;
        this.address = address
        this.schedule = schedule
    }
}