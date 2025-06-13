import { getDataSourceToken } from "@nestjs/typeorm";
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
import { EventRepositoryTypeORM } from "src/Infra/Database/Repositories/event.repository-typeorm";
import { Event } from "src/Infra/Database/Schemas/event.schema";
import { EventAreaService } from "src/Core/App/Services/event.service";
import { ScheduleRepositoryTypeORM } from "@infra/Database/Repositories/schedule.repository-typeorm";
import { Schedule } from "@infra/Database/Schemas/schedule.schema";

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
        useFactory:(repo:UserRepositoryTypeORM,hash:BcryptHash,token:JSONWebToken)=>{
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
        inject:[EventRepositoryTypeORM,AreaRepositoryTypeORM,UserRepositoryTypeORM],
        provide:EventAreaService,
        useFactory:(eventRepo:EventRepositoryTypeORM,areaRepo:AreaRepositoryTypeORM,userRepo:UserRepositoryTypeORM)=>{
            return new EventAreaService(eventRepo,areaRepo,userRepo)
        }
    },
    {
        inject:[AreaRepositoryTypeORM,AddressRepositoryTypeORM,ScheduleRepositoryTypeORM],
        provide:AreaService,
        useFactory:(areaRepo:AreaRepositoryTypeORM,addressRepo:AddressRepositoryTypeORM,scheduleRepo:ScheduleRepositoryTypeORM)=>{
            return new AreaService(areaRepo,addressRepo,scheduleRepo)
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
      provide:EventRepositoryTypeORM,
      useFactory:(dataSource:DataSource)=>{
        return new EventRepositoryTypeORM(
          dataSource.getRepository(Event),
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
    },
    {
        inject:[getDataSourceToken()],
        provide:ScheduleRepositoryTypeORM,
        useFactory:(dataSource:DataSource)=>{
            return new ScheduleRepositoryTypeORM(
                dataSource.getRepository(Schedule)
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