import { IAddressRepository } from 'src/Core/Domains/Repositories/address.repository';
import { Repository } from 'typeorm';
import { Address } from '../Schemas/address.schema';
import { AddressModel } from '@domain/Models/address.model';
import { AddressMapper } from '../Mappers/AddressMapper';

export class AddressRepositoryTypeORM implements IAddressRepository {
    constructor(private ormRepo: Repository<Address>) {}

    async create(data: AddressModel): Promise<AddressModel> {
        const model = AddressMapper.toORM(data); 
        const address = await this.ormRepo.save(model);
        return AddressMapper.toDomain(address);
    }

    async update(id: number, data: AddressModel): Promise<AddressModel> {
        const exists = await this.ormRepo.findOne({ where: { id } });
        if (!exists) throw new Error("address not found");

        const entity = AddressMapper.toORM(data);
        entity.id = id;

        await this.ormRepo.save(entity);

        return AddressMapper.toDomain(entity);
    }

    async findById(id: number): Promise<AddressModel | null> {
        const address = await this.ormRepo.findOne({ where: { id } });
        return address ? AddressMapper.toDomain(address) : null;
    }

    async findAll(): Promise<AddressModel[]> {
        const addresses = await this.ormRepo.find();
        return addresses.map(AddressMapper.toDomain);
    }

    async delete(id: number): Promise<boolean> {
       return false
    }
}
