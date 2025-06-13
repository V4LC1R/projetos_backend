
import { IsNull, Not, Repository } from 'typeorm';
import { IAreaRepository } from '@domain/Repositories/area.repository';
import { Area } from '../Schemas/area.schema';
import { IUserRepository } from '@domain/Repositories/user.repository';
import { AreaModel } from '@domain/Models/area.model';
import { AreaMapper } from '../Mappers/AreaMapper';
import { ActiveStatusEnum } from '@shared/Visibility';

export class AreaRepositoryTypeORM implements IAreaRepository {
    constructor(
        private ormRepo:Repository<Area>,
        private userRepo:IUserRepository,
    ){}

    async create(data:AreaModel):Promise<AreaModel>{
        
        const model = AreaMapper.toORM(data);
        const area =  await this.ormRepo.save(model)
        return AreaMapper.toDomain(area)
    }  
    
    async update(id:number,data:AreaModel){

        const {schedule,address,...areaData} = data

        await this.ormRepo.update({id},{...areaData});

        const updatedArea = await this.findById(id)

         if(!updatedArea)
            throw new Error("Area not found!")

        return updatedArea
    }

    async delete(id: number): Promise<boolean> {
        return !await this.ormRepo.update(id,{active:ActiveStatusEnum.INACTIVE});
    }

    async findById(id: number): Promise<AreaModel | null> {
        const area = await this.ormRepo.findOne({
            relations: { address: true,owner: true,categories:true },
            where:{id,active:ActiveStatusEnum.ACTIVE},
            order:{id:'desc'}
        });
        
        if(!area)
            return null;

        return AreaMapper.toDomain(area)
    }

    async findAll(): Promise<AreaModel[]> {
        const areas = await this.ormRepo.find({order:{id:'desc'}});
        return areas.map(area => AreaMapper.toDomain(area));
    }

    async findByOwnerId(ownerId: number): Promise<AreaModel[]> {

        const areas = await this.ormRepo.find({
            relations: { address: true,owner:true,categories:true},
            where: { owner:{id:ownerId} ,active:ActiveStatusEnum.ACTIVE},
            order:{id:'desc'}
        });

        return areas.map(area =>AreaMapper.toDomain(area))
        
    }
    
    async findByCoordinates(
        lat: number,
        lng: number,
        distance: number,
        categoryId?:number[]
    ): Promise<any[]> {
        const qb = this.ormRepo
            .createQueryBuilder("areas")
            .innerJoin("areas.address", "address")
            .select([
                "areas.id AS area_id",
                "areas.name AS area_name",
                "address.id AS address_id",
                "address.street AS street",
                "address.latitude AS latitude",
                "address.longitude AS longitude",
            ])
            .addSelect(`
                (
                    6371 * acos(
                    cos(radians(:lat)) * cos(radians(address.latitude)) *
                    cos(radians(address.longitude) - radians(:lng)) +
                    sin(radians(:lat)) * sin(radians(address.latitude))
                )
            )
            `, "distance")
            .where("areas.active = :active", { active: ActiveStatusEnum.ACTIVE })
            .having("distance < :distance", { distance })
            .orderBy("distance", "ASC")
            .setParameters({ lat, lng });

        if (categoryId?.length) {
            qb.innerJoin("areas.categories", "categories")
            .andWhere("categories.id IN (:...categoryIds)", { categoryId })
        }

        const result = await qb.getRawMany();
        return result;
    }


    async isOwner(ownerId: number, areaId: number): Promise<boolean> {
        return await this
            .ormRepo
            .exists(
                {   where:
                    {
                        id:areaId,
                        owner:{id:ownerId},
                        active:ActiveStatusEnum.ACTIVE
                    }
                })
    }
}