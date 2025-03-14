import { UserModel } from 'src/Core/Domains/Models/user.model';
import { IUserRepository } from '../../../Core/Domains/Repositories/user.repository';
import { Repository } from 'typeorm';
import { User } from '../Schemas/user.schema';

export class CreateUserRepository implements IUserRepository {
    constructor(
        private ormRepo:Repository<User>
    ){}

    async create(userData:UserModel):Promise<UserModel>{
        const model = this.ormRepo.create(userData); 
        const user =  await this.ormRepo.save(model);
        return new UserModel(user.name, user.email, user.password, user.id);
    }   
}