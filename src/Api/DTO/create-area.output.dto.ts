import { AreaModel } from 'src/Core/Domains/Models/area.model';
import { UserModel } from "src/Core/Domains/Models/user.model";

export class CreateAreaOutputDto {
    id: number;
    name: string;
    rent: number;
    owner?: UserModel;
    createdAt: Date;
    updatedAt: Date;

    constructor(areaModel:AreaModel) {
        this.id = areaModel.id ?? 0;
        this.name = areaModel.name;
        this.rent = areaModel.rent;
        this.createdAt = areaModel.createdAt;
        this.updatedAt = areaModel.updatedAt;
        this.owner = areaModel.owner;
    }
}