import { UserModel } from 'src/Core/Domains/Models/user.model';
import { IUserRepository } from '../../../Core/Domains/Repositories/user.repository';
import { Repository } from 'typeorm';
import { User } from '../Schemas/user.schema';

export class UserRepositoryTypeORM implements IUserRepository {
    constructor(
        private ormRepo:Repository<User>
    ){}

    async findByEmail(userEmail: string): Promise<UserModel|null> {

        const user = await this.ormRepo.findOne({where:{email:userEmail}})

        if(!user)
            return null;

        const {name,id, email,password,cellphone} = user;
        return new UserModel(name,email,password,id,cellphone)
    }

    async create(data:UserModel):Promise<UserModel>{
        const model = this.ormRepo.create(data); 
        const user =  await this.ormRepo.save(model);
        return new UserModel(user.name, user.email, user.password, user.id);
    }  
    
    async update(data:UserModel):Promise<UserModel>{
        await this.ormRepo.update({id:data.id},data);
        if(!data.id)
            throw new Error("User not found");

        const user = await this.findById(data.id);
        if(!user) 
            throw new Error("User not found");

        return new UserModel(user.name, user.email, user.password, user.id);
    }

    async delete(id: number): Promise<boolean> {
        return false
    }

    async findById(id: number): Promise<UserModel | null> {
        const user = await this.ormRepo.findOne({where:{id}});
        if(!user)
            return null;

        const {name,email,password} = user;
        return new UserModel(name,email,password,id);
    }

    async findAll(): Promise<UserModel[]> {
        const users = await this.ormRepo.find();
        return users.map(user => new UserModel(user.name, user.email, user.password, user.id));
    }

    async updatePassword(userId: number, newPassword: string) {
        await this.ormRepo.update({id:userId},{password:newPassword});

        const user = await this.findById(userId);
        if(!user) 
            throw new Error("User not found");
        
        return new UserModel(user.name, user.email, user.password, user.id);
    }
}