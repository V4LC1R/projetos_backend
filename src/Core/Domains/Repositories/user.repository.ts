import { UserModel } from "../Models/user.model";
import { IBaseRepository } from "./base.repository";

export interface IUserRepository extends IBaseRepository<UserModel> {
    findByEmail(email:string):Promise<UserModel|null>;
    updatePassword(userId:number,newPassword:string)
}