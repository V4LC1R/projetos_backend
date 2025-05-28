import { Address } from './../Schemas/address.schema';
import { Repository } from 'typeorm';
import { IAddressRepository } from 'src/Core/Domains/Repositories/address.repository';
import { AddressModel } from 'src/Core/Domains/Models/address.model';
import { AreaModel } from 'src/Core/Domains/Models/area.model';

export class AddressRepositoryTypeORM implements IAddressRepository {
    constructor(
        private ormRepo:Repository<Address>
    ){}

    async create(data:{address:AddressModel,area:AreaModel}):Promise<AddressModel>{
        const model = this.ormRepo.create({...data.address,area:data.area}); 
        
        const address =  await this.ormRepo.save(model);

        return new AddressModel(
            address.number_place,
            address.district,
            address.country,
            address.street,
            address.city,
            address.state,
            address.complement,
            address.latitude,
            address.longitude,
            data.area.id ?? 0
        )
    }  
    
    async update(id:number,data:AddressModel):Promise<AddressModel>{
        await this.ormRepo.update({id:id},data);
        if(!data.id)
            throw new Error("address not found");

        const address = await this.findById(id);
        if(!address) 
            throw new Error("address not found");

        return new AddressModel(
            address.number_place,
            address.district,
            address.country,
            address.street,
            address.city,
            address.state,
            address.complement,
            address.latitude,
            address.longitude,
            address.areaId
        )
    }

    async delete(id: number): Promise<boolean> {
        return false
    }

    async findById(id: number): Promise<AddressModel | null> {
        const address = await this.ormRepo.findOne({where:{id}});
        if(!address)
            return null;

        return new AddressModel(
            address.number_place,
            address.district,
            address.country,
            address.street,
            address.city,
            address.state,
            address.complement,
            address.latitude,
            address.longitude,
            address.area.id
        )
    }

    async findAll(): Promise<AddressModel[]> {
        const address = await this.ormRepo.find();
        return address.map((address: Address) => new AddressModel(
            address.number_place,
            address.district,
            address.country,
            address.street,
            address.city,
            address.state,
            address.complement,
            address.latitude,
            address.longitude,
            address.area.id
        ));
    }

}