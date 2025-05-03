import { UserModel } from "./user.model";

export class AreaModel {
    id?: number;
    name: string;
    rent: number;
    createdAt: Date;
    updatedAt: Date;
    owner: UserModel

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
            owner.password ?? '',
            owner.id ?? 0
        );
    }
}