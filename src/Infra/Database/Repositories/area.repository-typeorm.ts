
import { IsNull, Not, Repository } from 'typeorm';
import { Area } from '../Schemas/area.schema';
import { IAreaRepository } from 'src/Core/Domains/Repositories/area.repository';
import { AreaModel } from 'src/Core/Domains/Models/area.model';
import { IUserRepository } from 'src/Core/Domains/Repositories/user.repository';
import { Address } from '../Schemas/address.schema';

interface AreaWithAddress extends Omit<Area , "address">,Omit<Address , "id">{}
export class AreaRepositoryTypeORM implements IAreaRepository {
    constructor(
        private ormRepo:Repository<Area>,
        private userRepo:IUserRepository,
    ){}

    async create(data:AreaModel):Promise<AreaModel>{
        const model = this.ormRepo.create({
            ...data,
            address:data.address
        }); 

        const area =  await this.ormRepo.save(model)
            
        return new AreaModel(
            area.name,
            area.rent,
            area.createdAt,
            area.updatedAt,
            area.id
        )
        .setAddress(area.address)
        .setOwner(data.owner);
    }  
    
    async update(id:number,data:AreaModel){

        await this.ormRepo.update({id},{...data});

        const updatedArea = await this.findById(id)

         if(!updatedArea)
            throw new Error("Area not found!")

        return new AreaModel(
            updatedArea.name,
            updatedArea.rent,
            updatedArea.createdAt,
            updatedArea.updatedAt,
            updatedArea.id
        )
        .setAddress(updatedArea.address);
    }

    async delete(id: number): Promise<boolean> {
        return false
    }

    async findById(id: number): Promise<AreaModel | null> {
        const area = await this.ormRepo.findOne({
            relations: { address: true,owner: true },
            where:{id}
        });
        
        if(!area)
            return null;


        return new AreaModel(
            area.name,
            area.rent,
            area.createdAt,
            area.updatedAt,
            area.id
        )
        .setAddress(area.address)
        .setOwner(area.owner ?? {});
    }

    async findAll(): Promise<AreaModel[]> {
        const areas = await this.ormRepo.find();
        return areas
            .map(area => new AreaModel(
                area.name,
                area.rent, 
                area.createdAt,
                area.updatedAt,
                area.id
        ));
    }

    async findByOwnerId(ownerId: number): Promise<AreaModel[]> {

        const areas = await this.ormRepo.find({
            relations: { address: true },
            where: { owner:{id:ownerId},address: { id: Not(IsNull()) } }
        });

        const owner = await this.userRepo.findById(ownerId)

        return areas.map(area =>{
            return new AreaModel(
                area.name,
                area.rent, 
                area.createdAt,
                area.updatedAt,
                area.id
            ) 
            .setOwner(owner ?? {})
            .setAddress(area.address)
        })
        
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
            .exists({where:{id:areaId,owner:{id:ownerId}}})
    }
}