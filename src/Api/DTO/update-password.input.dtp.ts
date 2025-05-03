export class UpdatePasswordInputDTO  {
    userId:number;
    password: string;
    constructor(userId:number, password: string) {
        this.userId = userId;
        this.password = password;
    }
}