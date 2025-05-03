import { ITokenService } from "src/Core/Domains/Services/token.service";

import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from "src/Core/App/Errors/UnauthorizedException";


export class JSONWebToken implements ITokenService {

    public SECRET_KEY:string = ''

    constructor(private readonly config:ConfigService){
        this.SECRET_KEY = config.get('JWT_SECRET') ?? ""
    }

    async generate<T extends Record<string,any>> (dataToken:T): Promise<string>{
        return jwt.sign(dataToken,this.SECRET_KEY)
    };

    async decode<T>(token: string): Promise<T> {
        return new Promise((success,reject)=>{
            jwt.verify(
                token,
                this.SECRET_KEY,
                (err,decoded)=>{
                    if(err || !decoded)
                        return reject(new UnauthorizedException('TOKEN Invalid!'))
                
                    return success(decoded as T);
                }
            )
        })
    }
}