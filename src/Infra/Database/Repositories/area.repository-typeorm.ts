
import { Repository } from 'typeorm';
import { AreaWithDistanceAndAvailability, IAreaRepository } from '@domain/Repositories/area.repository';
import { Area } from '../Schemas/area.schema';
import { IUserRepository } from '@domain/Repositories/user.repository';
import { AreaModel } from '@domain/Models/area.model';
import { AreaMapper } from '../Mappers/AreaMapper';
import { ActiveStatusEnum } from '@shared/Visibility';
import { Category } from '../Schemas/category.schema';
import { CategoryModel } from '@domain/Models/category.model';
import { CategoryMapper } from '../Mappers/CategoryMapper';
import { AvailabilityStatus } from '@domain/Models/schedule.model';

export class AreaRepositoryTypeORM implements IAreaRepository {
    constructor(
        private ormRepo:Repository<Area>,
        private category:Repository<Category>,
        private userRepo:IUserRepository,
    ){}

    async create(data:AreaModel):Promise<AreaModel>{
        
        const model = AreaMapper.toORM(data);
        console.log('>>',model)
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
        const {affected}= await this.ormRepo.update(id,{active:ActiveStatusEnum.INACTIVE});
        return affected ? affected > 0 : false;
    }

    async findById(id: number): Promise<AreaModel | null> {
        const area = await this.ormRepo.findOne({
            relations: { address: true,owner: true,categories:true,schedule:true },
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
            relations: { address: true,owner:true,categories:true,schedule:true },
            where: { owner:{id:ownerId} ,active:ActiveStatusEnum.ACTIVE},
            order:{id:'desc'}
        });

        return areas.map(area =>AreaMapper.toDomain(area))
        
    }
    
    async findByCoordinates(
        lat: number,
        lng: number,
        distance: number,
        categoryId?: number[]
    ): Promise<AreaWithDistanceAndAvailability[]> {
        const qb = this.ormRepo
            .createQueryBuilder("areas")
            .innerJoin("areas.address", "address")
            .innerJoin("areas.owner", "owner")
            .select([
                "areas.id AS areas_id",
                "areas.rent AS areas_rent",
                "areas.name AS areas_name",
                "owner.name AS ownerName",
                "address.district AS address_district",
                "address.number_place AS address_number_place",
                "address.city AS address_city",
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
            .addSelect(qbSub => {
                return qbSub
                    .select("COUNT(*)")
                    .from("schedule", "s")
                    .where("s.areaId = areas.id")
                    .andWhere("s.status = :availableStatus")
                    .andWhere("s.active = :activeStatus")
                    .andWhere("s.eventId IS NULL");
            }, "availableSchedules")
            .where("areas.active = :activeStatus")
            .andWhere(`
                (
                    6371 * acos(
                        cos(radians(:lat)) * cos(radians(address.latitude)) *
                        cos(radians(address.longitude) - radians(:lng)) +
                        sin(radians(:lat)) * sin(radians(address.latitude))
                    )
                ) < :distance
            `)
            .orderBy("distance", "ASC")
            .distinct(true);

        if (categoryId?.length) {
            qb.innerJoin("areas.categories", "categories")
            .andWhere("categories.id IN (:...categoryId)");
        }

        qb.setParameters({
            lat,
            lng,
            distance,
            activeStatus: ActiveStatusEnum.ACTIVE,
            availableStatus: AvailabilityStatus.AVAILABLE,
            categoryId,
        });

        return qb.getRawMany();
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

    async getCategories(): Promise<CategoryModel[]> {
        const categories = await this.category.find()
        return categories.map(c=>CategoryMapper.toDomain(c))
    }
}