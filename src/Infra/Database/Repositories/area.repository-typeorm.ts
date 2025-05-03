
import { UserModel } from 'src/Core/Domains/Models/user.model';
import { Repository } from 'typeorm';
import { User } from '../Schemas/user.schema';
import { Area } from '../Schemas/area.schema';
import { IAreaRepository } from 'src/Core/Domains/Repositories/area.repository';
import { AreaModel } from 'src/Core/Domains/Models/area.model';
import { IUserRepository } from 'src/Core/Domains/Repositories/user.repository';

export class AreaRepositoryTypeORM implements IAreaRepository {
    constructor(
        private ormRepo:Repository<Area>,
        private userRepo:IUserRepository
    ){}

    async create(data:AreaModel):Promise<AreaModel>{
        const model = this.ormRepo.create(data); 
        if(!data.owner || !data.owner.id)
            throw new Error('Owner is required');

        const user = await this.userRepo.findById(data.owner.id);
        const area =  await this.ormRepo.save(model);
            const areaModel = new AreaModel(area.name, area.rent, area.createdAt, area.updatedAt, area.id);
        if(user)
            areaModel.setOwner(user);

        return areaModel;
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