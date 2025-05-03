import { UserModel } from "src/Core/Domains/Models/user.model";

export class CreateUserOutputDTO  {
    email: string;
    name: string;
    id: number;
    constructor(user:UserModel) {
        this.email = user.email;
        this.name = user.name;
        this.id = user.id ?? 0;
    }
}