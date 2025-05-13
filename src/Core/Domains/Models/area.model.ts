import { AddressModel } from "./address.model";
import { UserModel } from "./user.model";

export class AreaModel {
    id?: number;
    name: string;
    rent: number;
    createdAt: Date;
    updatedAt: Date;
    owner: UserModel;
    address?:AddressModel

    constructor(name: string, rent: number, createdAt: Date, updatedAt: Date, id?: number) {
        this.name = name;
        this.rent = rent;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }

    setOwner(owner: Partial<UserModel>) {
        this.owner = new UserModel(
            owner.name ?? '',
            owner.email ?? '',
            '',
            owner.id ?? 0
        );

        return this
    }

    setAddress(address: Partial<AddressModel>){
        this.address = new AddressModel(
            address.number_place ?? "",
            address.district ?? "",
            address.country ?? "",
            address.street ?? "",
            address.city ?? "",
            address.state ?? "",
            address.complement ?? "",
            address.latitude ?? "",
            address.longitude ?? "",
            address.areaId ?? 0,
            address.id ?? 0
        )

        return this
    }
}