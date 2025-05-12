import { AddressModel } from "src/Core/Domains/Models/address.model";
import { AreaModel } from "src/Core/Domains/Models/area.model";

export class AreaCreateOutput {
    id: number;
    name: string;
    rent: number;
    owner_id: number;
    address:AddressModel

    constructor(area:AreaModel,address:AddressModel) {
        this.id = area.id ?? 0;
        this.name = area.name;
        this.rent = area.rent;
        this.owner_id = area?.owner.id ?? 0;
    }

    
}