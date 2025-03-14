import { IEncriptService } from "../../Domains/Services/encript.service";
import { IUserRepository } from "../../Domains/Repositories/user.repository";
import { CreateUserInputDTO } from "../DTO/create-user.input.dto";
import { CreateUserOutputDTO } from "../DTO/create-user.output.dto";

export class UserService {
    constructor(
        private userRepo:IUserRepository,
        private encriptService:IEncriptService
    ) {}

    async create(userData:CreateUserInputDTO) {
        const password = await this.encriptService.encript(userData.password);
        const user = await this.userRepo.create({...userData, password});
        return new CreateUserOutputDTO(user);
    }

    // async authenticate(email:string, password:string) {
    //     const user = await this.userRepo.findByEmail(email);
    //     if(!user) return null;
    //     const isValid = await this.encriptService.compare(password, user.password);
    //     if(!isValid) return null;
    //     return new CreateUserOutputDTO(user);
    // }
}