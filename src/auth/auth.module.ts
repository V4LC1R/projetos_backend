import { Module } from '@nestjs/common';
import { AuthControllerController } from './auth-controller.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Infra/Database/Schemas/user.schema';
import { UserRepositoryTypeORM } from 'src/Infra/Database/Repositories/user.repository-typeorm';
import { DataSource } from 'typeorm';
import { UserService } from 'src/Core/App/Services/user.service';
import { IUserRepository } from 'src/Core/Domains/Repositories/user.repository';
import { IEncriptService } from 'src/Core/Domains/Services/encript.service';
import { BcryptHash } from 'src/Infra/Hashing/bcrypt.hash';

@Module({
  imports:[TypeOrmModule.forFeature([
    User
  ])],
  providers:[
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
      provide: BcryptHash, // Ou use um token (ex: 'IEncriptService') se preferir
      useClass: BcryptHash,
    },
    {
      inject:[UserRepositoryTypeORM,BcryptHash],
      provide:UserService,
      useFactory:(repo:IUserRepository,hash:IEncriptService)=>{
        return new UserService(repo,hash)
      }
    }
  ],
  controllers: [AuthControllerController]
})
export class AuthModule {}
