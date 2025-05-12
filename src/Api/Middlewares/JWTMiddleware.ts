import { JSONWebToken } from "src/Infra/Services/jsonWebToken.service";
import { ConfigService } from '@nestjs/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from "src/Core/Domains/Models/user.model";

interface AuthRequest extends Request {
    user?: UserModel
}

@Injectable()
export class JWTMiddleware implements NestMiddleware{
    async use(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const jwt = new JSONWebToken();

            const token = req.headers['authorization']?.split(' ')[1];

            if(!token)
                return res.status(401).json({message: 'Token not found!'});
            req.user = await jwt.decode<UserModel>(token)
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: 'Unauthorized!'});
        }
        
    }
}