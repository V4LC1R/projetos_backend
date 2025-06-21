import { CategoryModel } from "@domain/Models/category.model";
import { AreaModel } from "../Models/area.model";
import { IBaseRepository } from "./base.repository";

export type AreaWithDistanceAndAvailability = {
    areas_id: number;
    areas_rent: number;
    areas_name: string;
    ownerName: string;
    address_district: string;
    address_number_place: string;
    address_city: string;
    latitude: number;
    longitude: number;
    distance: number; // Distância calculada
    availableSchedules: number; // Contagem de horários disponíveis
};

export interface IAreaRepository extends IBaseRepository<AreaModel>
{
    findByOwnerId(ownerId: number): Promise<AreaModel[]>;
    findByCoordinates<T>(lat:number, lng: number,distance:number, categoryId?: number[]): Promise<AreaWithDistanceAndAvailability[]>;
    isOwner(ownerId:number,areaId:number): Promise<boolean>;
    getCategories(): Promise<CategoryModel[]>;
}