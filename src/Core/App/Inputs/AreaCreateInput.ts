import { AddressCreateInput } from "./AddressCreateInput";

export class AreaCreateInput {
    name: string;
    rent: number;
    address:AddressCreateInput

    constructor(
        name: string,
        rent: number,
        address:AddressCreateInput
    ) {
        this.name = name;
        this.rent = rent;
        this.address = address
    }
}