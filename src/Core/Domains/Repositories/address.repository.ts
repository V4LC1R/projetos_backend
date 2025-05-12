
import { AddressModel } from "../Models/address.model";
import { IBaseRepository } from "./base.repository";

export interface IAddressRepository extends IBaseRepository<AddressModel> {
    //findByOwnerId(ownerId: number): Promise<AddressModel[]>;
}