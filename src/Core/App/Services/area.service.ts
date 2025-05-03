import { IAreaRepository } from "src/Core/Domains/Repositories/area.repository";
import { AreaModel } from 'src/Core/Domains/Models/area.model';
import { AreaCreateInput } from "../Inputs/AreaCreateInput";
import { AreaCreateOutput } from "../Output/AreaCreateOutput";


export class AreaService {
    constructor(
        private userRepo:IAreaRepository
    ) {}

    async create(areaData:AreaCreateInput) {
        const areaModel = new AreaModel(areaData.name, areaData.rent, new Date(), new Date());
        areaModel.setOwner({id: areaData.owner_id});
        const area = await this.userRepo.create(areaModel);
        if(!area.id)
            throw new Error('Something went wrong on creating area');
        return new AreaCreateOutput(area);
    }

}