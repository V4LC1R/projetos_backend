export class UserModel{
    id?: number;
    name: string;
    email: string;
    password: string;
    cellphone?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(name: string, email: string, password: string, id?: number, cellphone?: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cellphone = cellphone;
    }
}