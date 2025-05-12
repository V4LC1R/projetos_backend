
import { ITokenService } from "src/Core/Domains/Services/token.service";
import { UserModel } from "src/Core/Domains/Models/user.model";
import { UnauthorizedException } from "@nestjs/common";
import { UserNotFoundException } from "../Errors/UserNotFoundExeception";
import { IUserRepository } from "src/Core/Domains/Repositories/user.repository";
import { IEncriptService } from "src/Core/Domains/Services/encript.service";
import { UserCreateInput } from "../Inputs/UserCreateInput";
import { UserCreateOutput } from "../Output/UserCreateOutput";
import { UserAuthOutput } from "../Output/UserAuthOutput";

export class UserService {
    constructor(
        private userRepo:IUserRepository,
        private encriptService:IEncriptService,
        private tokenService:ITokenService
    ) {}

    async create(userData:UserCreateInput) {
        const password = await this.encriptService.encript(userData.password);
        const userModel = new UserModel(userData.name, userData.email, password);
        const user = await this.userRepo.create(userModel);
        return new UserCreateOutput(user);
    }

    async profile(userId:number){
        const user = await this.userRepo.findById(userId);

        if(!user)
            throw new UserNotFoundException();

        const userModel = new UserModel(user.name, user.email, user.password, user.id, user.cellphone);

        return new UserCreateOutput(userModel)
    }

    async changePassword(userId:number,newPassword:string)
    {
        const password = await this.encriptService.encript(newPassword);
        const user = await this.userRepo.updatePassword(userId,password);
        if(!user)
            throw new UserNotFoundException();
        const userModel = new UserModel(user.name, user.email, user.password, user.id);
        return new UserCreateOutput(userModel);
    }

    async authenticate(email:string, password:string) {
        const user = await this.userRepo.findByEmail(email);

        if(!user) 
            throw new UnauthorizedException("User not found!");

        const isValid = await this.encriptService.compare(password, user.password);
       
        if(!isValid) 
            throw new UnauthorizedException();

        const token = await this.tokenService.generate({
            name:user.name,
            email:user.email,
            id:user.id
        });
        user.setToken(token);
        return new UserAuthOutput(user.name, user.email, token);
    }
}