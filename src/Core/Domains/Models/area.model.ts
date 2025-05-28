import { AddressModel } from "./address.model";
import { OwnerModel } from "./owner.model";

export class AreaModel {
    id?: number;
    name: string;
    rent: number;
    createdAt: Date;
    updatedAt: Date;
    owner: OwnerModel;
    address:AddressModel

    constructor(name: string, rent: number, createdAt: Date, updatedAt: Date, id?: number) {
        this.name = name;
        this.rent = rent;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }

    setOwner(owner: Partial<OwnerModel>) {
        this.owner = new OwnerModel(
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