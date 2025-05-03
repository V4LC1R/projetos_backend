import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './Api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      useFactory: (config:ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/Infra/Database/Schemas/*.schema{.ts,.js}'],
        migrations: [__dirname + '/Infra/Database/Migrations/*-migration{.ts,.js}'],
        synchronize: false,
        autoLoadEntities:true
      }),
      inject: [ConfigService],
    }),
    ApiModule,
   
  ],
  providers: [],
})
export class AppModule {}
