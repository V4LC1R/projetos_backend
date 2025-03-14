import { UserModel } from "../Models/user.model";

export interface IUserRepository {
    create(userData:UserModel):Promise<UserModel>;
    // update(userData:User):Promise<User>;
    // delete(id:number):Promise<boolean>;
    // findById(id:number):Promise<User>;
    // findByEmail(email:string):Promise<User>;
}