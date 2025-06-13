import { GuestModel } from './../Models/guest.model';
import { UserModel } from "../Models/user.model";
import { IBaseRepository } from "./base.repository";

export interface IUserRepository extends IBaseRepository<UserModel> {
    findByEmail(email:string):Promise<UserModel|null>;
    updatePassword(userId:number,newPassword:string):Promise<UserModel|null>;
    findGuestById(guestId:number):Promise<GuestModel |null>
}