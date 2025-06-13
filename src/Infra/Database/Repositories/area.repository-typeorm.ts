
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
            relations: { address: true,owner: true },
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
            relations: { address: true,owner:true},
            where: { owner:{id:ownerId} ,active:ActiveStatusEnum.ACTIVE},
            order:{id:'desc'}
        });

        return areas.map(area =>AreaMapper.toDomain(area))
        
    }

    async findByCoordinates<AreaWithAddress>(lat: number, lng: number,distance:number): Promise<AreaWithAddress[]> {;
        const query = `
            SELECT 
                areas.id as area_id,
                areas.name as area_name,
                address.id as address_id,
                address.street,
                address.latitude,
                address.longitude,
                (
                    6371 * acos(
                        cos(radians(:lat)) * cos(radians(address.latitude)) *
                        cos(radians(address.longitude) - radians(:lng)) +
                        sin(radians(:lat)) * sin(radians(address.latitude))
                    )
                ) AS distance
            FROM address
            RIGHT JOIN areas ON areas.address_id = address.id
            WHERE area.active = 1
            HAVING distance < :distance
            ORDER BY distance
        `;
        const address:AreaWithAddress[] = await this
            .ormRepo
            .query(query, [ lat, lng ,distance ]);

        return address
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