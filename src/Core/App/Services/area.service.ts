import { IAreaRepository } from "src/Core/Domains/Repositories/area.repository";
import { AreaCreateInput } from "../Inputs/AreaCreateInput";
import { AddressService } from "./address.service";

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

        await this.addressService.create(area.id,areaData.address)
        return area;
    }

    async edit(areaId:number,ownerId:number,areaData:AreaCreateInput){

        const isCorrectOwner = await this.areaRepo.isOwner(ownerId,areaId)

        if(!isCorrectOwner)
            throw new Error("This user is not owner from this area!");

        const area = await this.areaRepo.update(areaId,areaData)
        return area
    }

    async getAllByOwner(ownerId: number) {
        const areas = await this.areaRepo.findByOwnerId(ownerId);
        
        return areas;
    }

    async getByPosition(lat:number, lng:number, distance:number) {
        const areas = await this.addressService.getByPosition(lat,lng,distance);
        return areas
    }

    async getById(areaId:number){
        const area = await this.getById(areaId);
        return area
    }
}