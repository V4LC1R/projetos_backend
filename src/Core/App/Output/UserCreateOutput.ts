import { UserModel } from "src/Core/Domains/Models/user.model";

export class UserCreateOutput{
    email: string;
    name: string;
    id: number;
    cellphone: string;

    constructor(user:UserModel) {
        this.email = user.email;
        this.name = user.name;
        this.id = user.id ?? 0;
        this.cellphone = user.cellphone ?? "";
    }
}