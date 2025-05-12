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

import { AddressRepositoryTypeORM } from "src/Infra/Database/Repositories/address.repository-typeorm";
import { AddressService } from "src/Core/App/Services/address.service";
import { Address } from "src/Infra/Database/Schemas/address.schema";

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
        provide:JSONWebToken,
        useClass:JSONWebToken,
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
        inject:[AddressRepositoryTypeORM],
        provide:AddressService,
        useFactory:(addressRepo:AddressRepositoryTypeORM)=>{
            return new AddressService(addressRepo)
        }
    },
    {
        inject:[AreaRepositoryTypeORM,AddressService],
        provide:AreaService,
        useFactory:(areaRepo:AreaRepositoryTypeORM,addressService:AddressService)=>{
            return new AreaService(areaRepo,addressService)
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
      provide:AddressRepositoryTypeORM,
      useFactory:(dataSource:DataSource)=>{
        return new AddressRepositoryTypeORM(
          dataSource.getRepository(Address),
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