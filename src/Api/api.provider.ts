import { ConfigService } from "@nestjs/config";
import { getDataSourceToken } from "@nestjs/typeorm";
//interfaces
import { IUserRepository } from "src/Core/Domains/Repositories/user.repository";
import { IEncriptService } from "src/Core/Domains/Services/encript.service";
//schemas
import { Area } from "src/Infra/Database/Schemas/area.schema";
import { User } from "src/Infra/Database/Schemas/user.schema";

import { DataSource } from "typeorm";
//controllers
import { AuthController } from "./Controllers/auth.controller";
import { EventController } from "./Controllers/event.controller";
import { AreaController } from "./Controllers/area.controller";
//core services
//infra services
import { BcryptHash } from "src/Infra/Services/bcrypt.service";
import { JSONWebToken } from "src/Infra/Services/jsonWebToken.service";
//repositories
import { AreaRepositoryTypeORM } from "src/Infra/Database/Repositories/area.repository-typeorm";
import { UserRepositoryTypeORM } from "src/Infra/Database/Repositories/user.repository-typeorm";
import { UserService } from "src/Core/App/Services/user.service";
import { AreaService } from "src/Core/App/Services/area.service";

const controllers = [
    AuthController,
    EventController,
    AreaController
]

const infraServices = [
    {
        provide: BcryptHash,
        useClass: BcryptHash,
    },
    {
        inject:[ConfigService],
        provide:JSONWebToken,
        useFactory:(config:ConfigService)=>{
            return new JSONWebToken(config)
        }
    }
]

const coreServices = [
    {
        inject:[UserRepositoryTypeORM,BcryptHash,JSONWebToken],
        provide:UserService,
        useFactory:(repo:IUserRepository,hash:IEncriptService,token:JSONWebToken)=>{
            return new UserService(repo,hash,token)
        }
    },
    {
        inject:[AreaRepositoryTypeORM],
        provide:AreaService,
        useFactory:(areaRepo:AreaRepositoryTypeORM)=>{
            return new AreaService(areaRepo)
        }
    }
]

const repositories = [
     {
      inject:[getDataSourceToken(),UserRepositoryTypeORM],
      provide:AreaRepositoryTypeORM,
      useFactory:(dataSource:DataSource,userRepo:UserRepositoryTypeORM)=>{
        return new AreaRepositoryTypeORM(
          dataSource.getRepository(Area),
          userRepo
        )
      }
    },
    {
        inject:[getDataSourceToken()],
        provide:UserRepositoryTypeORM,
        useFactory:(dataSource:DataSource)=>{
            return new UserRepositoryTypeORM(
                dataSource.getRepository(User)
            )
        }
    }
]

export const APIProvider = {
    services:[
        ...coreServices,
        ...infraServices,
        ...repositories
    ],
    controllers
}