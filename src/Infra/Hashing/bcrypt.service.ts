import { IEncriptService } from "src/Core/Domains/Services/encript.service";
import * as bcrypt from 'bcrypt';

export class BcryptService  implements IEncriptService {
    async encript(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(plain: string, encrypted: string): Promise<boolean> {
        return await bcrypt.compare(plain, encrypted);
    }
}