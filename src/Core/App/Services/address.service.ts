import { AddressModel } from "src/Core/Domains/Models/address.model";
import { IAddressRepository } from "src/Core/Domains/Repositories/address.repository";
import { AddressCreateInput } from "../Inputs/AddressCreateInput";

export class AddressService {
    constructor(
        private readonly addressRepo:IAddressRepository
    ) {}

    async create(area,data:AddressCreateInput) {
        const address = await this.addressRepo.create({address:data,area})

        return address
    }

    async getByPosition(lat:number, lng:number, distance:number){
        
    }
}