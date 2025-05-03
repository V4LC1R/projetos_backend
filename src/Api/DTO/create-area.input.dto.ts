import { AreaModel } from "src/Core/Domains/Models/area.model";
import { UserModel } from "src/Core/Domains/Models/user.model";

export class CreateAreaInputDto {
    name: string;
    rent: number;
    owner_id: number;

    constructor(name: string, rent: number) {
        this.name = name;
        this.rent = rent;
    }

    setIdOwner(id: number) {
        this.owner_id = id;
    }
}
