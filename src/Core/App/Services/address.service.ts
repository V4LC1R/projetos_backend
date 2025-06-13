import { AddressModel } from "src/Core/Domains/Models/address.model";
import { IAddressRepository } from "src/Core/Domains/Repositories/address.repository";
import { AddressCreateInput } from "../Inputs/AddressCreateInput";
import { AddressBuilder } from "@domain/Builders/AddressBuilder";

export class AddressService {
    constructor(
        private readonly addressRepo:IAddressRepository
    ) {}

    async create(area,data:AddressCreateInput) {
        const addressModel = AddressBuilder.fill(data).setArea(area);
            
        const address = await this.addressRepo.create(addressModel.build())

        return address
    }

    async getByPosition(lat:number, lng:number, distance:number){
        
    }
}