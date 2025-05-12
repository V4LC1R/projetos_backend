import { ITokenService } from "src/Core/Domains/Services/token.service";

import  * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from "src/Core/App/Errors/UnauthorizedException";
import { ENV } from "../Helper/Env";


export class JSONWebToken implements ITokenService {

    async generate<T extends Record<string,any>> (dataToken:T): Promise<string>{
        console.log('>>>>>>>>', dataToken)
        return jwt.sign(dataToken, ENV.load("JWT_SECRET_KEY","") ?? "")
    };

    async decode<T>(token: string): Promise<T> {
        return new Promise((success,reject)=>{
            jwt.verify(
                token,
                ENV.load("JWT_SECRET_KEY","") ?? "",
                (err,decoded)=>{
                    if(err || !decoded)
                        return reject(new UnauthorizedException('TOKEN Invalid!'))
                
                    return success(decoded as T);
                }
            )
        })
    }
}