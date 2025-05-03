import { UserModel } from 'src/Core/Domains/Models/user.model';
export class AuthUserOutputDTO  {
    token: string;
    email: string;
    name: string;
    constructor(user:UserModel) {
        if(!user.token || user.token.length <= 0)
            throw new Error('Token is required');

        this.token = user.token;
        this.email = user.email;
        this.name = user.name;
    }
}