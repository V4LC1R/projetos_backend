import { UserModel } from 'src/Core/Domains/Models/user.model';
import { IUserRepository } from '../../../Core/Domains/Repositories/user.repository';
import { Repository } from 'typeorm';
import { User } from '../Schemas/user.schema';
import { GuestModel } from '@domain/Models/guest.model';

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
    
    async update(id:number,data:UserModel):Promise<UserModel>{
        await this.ormRepo.update({id},data);
        if(!data.id)
            throw new Error("User not found");

        const user = await this.findById(id);
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

        return new UserModel(user.name, user.email, user.password, user.id, user.cellphone);
    }

    async findGuestById(guestId: number): Promise<GuestModel | null> {
        const user  = await this.findById(guestId);

        if(!user)
            return null

        return new GuestModel(user?.name,user?.email,"",user?.id,user.cellphone)
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