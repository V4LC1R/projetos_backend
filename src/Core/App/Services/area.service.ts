import { Address } from './../../../Infra/Database/Schemas/address.schema';
import { IAreaRepository } from "src/Core/Domains/Repositories/area.repository";
import { AreaModel } from 'src/Core/Domains/Models/area.model';
import { AreaCreateInput } from "../Inputs/AreaCreateInput";
import { AreaCreateOutput } from "../Output/AreaCreateOutput";
import { AddressService } from "./address.service";
import { AddressCreateInput } from '../Inputs/AddressCreateInput';
import { AddressCreateOutput } from '../Output/AddressCreateOutput';
import { AddressModel } from 'src/Core/Domains/Models/address.model';


export class AreaService {
    constructor(
        private readonly areaRepo:IAreaRepository,
        private readonly addressService:AddressService
    ) {}

    async create(owner_id:number,areaData:AreaCreateInput) {
      
        const createAreaPayload = {...areaData,owner:{id:owner_id}}
        const area = await this.areaRepo.create(createAreaPayload);
        if(!area.id)
            throw new Error('Something went wrong on creating area');

        this.addressService.create(area.id,areaData.address)
        return area;
    }

    async getAllByOwner(ownerId: number) {
        const areas = await this.areaRepo.findByOwnerId(ownerId);
        
        console.log(areas)

        return areas.map((area) => {
            return new AreaCreateOutput(area,area.address ?? {} as AddressModel);
        });
    }

    async getByPosition(lat:number, lng:number, distance:number) {
        const areas = await this.addressService.getByPosition(lat,lng,distance);
        return areas
    }
}