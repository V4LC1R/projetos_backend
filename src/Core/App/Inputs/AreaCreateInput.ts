import { AddressCreateInput } from "./AddressCreateInput";

export class AreaCreateInput {
    name: string;
    rent: number;
    address:AddressCreateInput
    schedule:any[]

    constructor(
        name: string,
        rent: number,
        address:AddressCreateInput,
        schedule:any
    ) {
        this.name = name;
        this.rent = rent;
        this.address = address
        this.schedule = schedule
    }
}