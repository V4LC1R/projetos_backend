import { AreaModel } from "./area.model"
import { UserModel } from "./user.model"

export class OwnerModel extends UserModel{
    areas?:AreaModel[]

    constructor(name:string, email:string, password:string,id:number = 0,cellphone?:string) {
        super(name, email, password, id, cellphone);
        this.areas = [];
    }

    setNewArea(area: AreaModel) {
        if(!this.areas)
            this.areas = [];
        this.areas.push(area);
        return this
    }

    getAreas(): AreaModel[] {
        return this.areas ?? [];
    }
}