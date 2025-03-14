import { BcryptService } from 'src/Infra/Hashing/bcrypt.service';
import { UserService } from './../../../../../src/Core/App/Services/user.service';
import { CreateUserRepository } from 'src/Infra/Database/Repositories/user.repository';
import { User } from 'src/Core/Domains/Models/user.model';
import { CreateUserInputDTO } from 'src/Core/App/DTO/create-user.input.dto';
describe("User Service test", ()=>{
    it("should be able to create a user", async ()=>{
        const hashService = new BcryptService();
        const userRepo = new CreateUserRepository();
        const userDto = new CreateUserInputDTO("test", "teste@email.com","teste-password");
        const userService = new UserService(userRepo, hashService)
        const user = await userService.create(userDto);

        expect(user).toBeInstanceOf(User);
        expect(user.id).toBeGreaterThan(0);
        expect(user.name).toBe(userDto.name);
        expect(user.email).toBe(userDto.email);
        expect(user).not.toHaveProperty('password');
    });
})