
import { Repository } from 'typeorm';
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

    async create(data:AreaModel):Promise<Area>{
        const model = this.ormRepo.create({
            ...data,
            address:data.address
        }); 

        const area =  await this.ormRepo.save(model)
            
        return area;
    }  
    
    async update(data:AreaModel):Promise<AreaModel>{
        const model = this.ormRepo.create(data); 
        const area =  await this.ormRepo.save(model);
         if(!data.owner || !data.owner.id)
            throw new Error('Owner is required');

        const user = await this.userRepo.findById(data.owner.id);
        const areaModel = new AreaModel(area.name, area.rent, area.createdAt, area.updatedAt, area.id);
        if(user)
            areaModel.setOwner(user);

        return areaModel;
    }

    async delete(id: number): Promise<boolean> {
        return false
    }

    async findById(id: number): Promise<AreaModel | null> {
        const area = await this.ormRepo.findOne({where:{id}});
        
        if(!area)
            return null;

        const {name,rent,createdAt,updatedAt} = area;
        
        const areaModel = new AreaModel(name,rent,createdAt,updatedAt,area.id);
        
        const user = await this.userRepo.findById(area.id);

        if(user)
            areaModel.setOwner(user);

        return areaModel;
    }

    async findByOwnerId(ownerId: number): Promise<AreaModel[]> {
        const areas = await this.ormRepo.find(
            {
                relations:['address'],
                where:{owner:{id: ownerId}}
            }
        );

        console.log(areas)
        const owner = await this.userRepo.findById(ownerId)

        return areas.map(area =>{
            const MyArea = new AreaModel(
                area.name,
                area.rent, 
                area.createdAt,
                area.updatedAt,
                area.id
            ) 
            .setOwner(owner ?? {})

            if(area.address){
                area.address.area = area
                MyArea.setAddress(area.address)
            }
                

            return MyArea
           
        }
           
        )
        
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
            const address:AreaWithAddress[] = await this.ormRepo.query(query, [ lat, lng ,distance ]);
    
            return address
        }

    
    async findAll(): Promise<AreaModel[]> {
        const areas = await this.ormRepo.find();
        return areas.map(area => new AreaModel(
                area.name,
                area.rent, 
                area.createdAt,
                area.updatedAt,
                area.id
        ));
    }
}