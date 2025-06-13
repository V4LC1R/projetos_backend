import { AddressCreateInput } from "./AddressCreateInput";
import { AddressUpdateInput } from "./AddressUpdateInput";

export class AreaUpdateInput {
    name: string;
    rent: number;
    address:AddressUpdateInput

    constructor(
        name: string,
        rent: number,
        address:AddressUpdateInput,
    ) {
        this.name = name;
        this.rent = rent;
        this.address = address
    }
}