export class UserCreateInput {
    name: string;
    email: string;
    password: string;
    cellphone: string;

    constructor(name: string, email: string, password: string, cellphone: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cellphone = cellphone;
    }
}