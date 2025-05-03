export class AuthUserInputDTO  {
    email: string;
    password: string;
    constructor(name: string, email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}