import { AreaModel } from "../Models/area.model";
import { IBaseRepository } from "./base.repository";

export interface IAreaRepository extends IBaseRepository<AreaModel> {
    findByOwnerId(ownerId: number): Promise<AreaModel[]>;
    findByCoordinates<T>(lat:number, lng: number,distance:number): Promise<T[]>;
    isOwner(ownerId:number,areaId:number): Promise<boolean>;
}