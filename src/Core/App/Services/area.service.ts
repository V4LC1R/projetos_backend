import { IAreaRepository } from "src/Core/Domains/Repositories/area.repository";
import { AreaCreateInput } from "../Inputs/AreaCreateInput";
import { IAddressRepository } from "@domain/Repositories/address.repository";
import { AreaBuilder } from "@domain/Builders/AreaBuildert";
import { IScheduleRepository } from "@domain/Repositories/schedule.repository";
import { AddressBuilder } from "@domain/Builders/AddressBuilder";
import { ScheduleModel } from "@domain/Models/schedule.model";
import { WrongOwnerActionExeception } from "@app/Errors/WrongOwnerActionExeception";
import { AreaUpdateInput } from "@app/Inputs/AreaUpdateInput";

export class AreaService {
    constructor(
        private readonly areaRepo:IAreaRepository,
        private readonly addressRepo:IAddressRepository,
        private readonly scheduleRepo:IScheduleRepository,
    ) {}

    async create(owner_id:number,areaData:AreaCreateInput) {
        
        const createAreaPayload = new  AreaBuilder()
            .setRent(areaData.rent)
            .setName(areaData.name)
            .setOwner({id:owner_id})
            .setCategories(areaData.categories)
       
        const area = await this.areaRepo.create(createAreaPayload.build());
        if(!area.id)
            throw new Error('Something went wrong on creating area');

        const createAddressPayload = AddressBuilder.fill(areaData.address)
        createAddressPayload.setAreaId(area.id)
        const address = await this.addressRepo.create(createAddressPayload.build())

        const scheduleModel = areaData.schedule.map(e=>new ScheduleModel(
            e.start_time,
            e.end_time,
            e.date,
        ).setAreaId(area.id))

        const schedules = await this.scheduleRepo.bulkInsert(scheduleModel)

        area
            .setAddress(address)
            .setSchedule(schedules)
        return area;
    }

    async delete(areaId:number,ownerId:number){
        const isCorrectOwner = await this.areaRepo.isOwner(ownerId,areaId)

        if(!isCorrectOwner)
            throw new WrongOwnerActionExeception("This user is not owner from this area!");

        if(!await this.areaRepo.delete(areaId))
            throw new Error("Error in delete area!")

        return {
            "message":"Area was deleted",
            "status":"sucess"
        }
    }

    async edit(areaId:number,ownerId:number,areaData:AreaUpdateInput){

        const isCorrectOwner = await this.areaRepo.isOwner(ownerId,areaId)

        if(!isCorrectOwner)
            throw new WrongOwnerActionExeception("This user is not owner from this area!");

        const area = await this.areaRepo.update(areaId,areaData)
        const addressPayload =  AddressBuilder.fill(areaData.address)

        const address = await this.addressRepo.update(areaData.address.id,addressPayload.build())
        return area.setAddress(address)
    }

    async getAllByOwner(ownerId: number) {
        const areas = await this.areaRepo.findByOwnerId(ownerId);
        return areas;
    }

    async getByPosition(lat:string, lng:string, distance:number,categoryId?:number[]) {
        const areas = await this.areaRepo.findByCoordinates(parseFloat(lat),parseFloat(lng),distance,categoryId);
        return areas
    }

    async getById(areaId:number){
        const area = await this.areaRepo.findById(areaId);
        return area
    }

    async getCategories(){
        return await this.areaRepo.getCategories()
    }
}