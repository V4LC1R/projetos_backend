import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {config} from 'dotenv';
config()
const configService = new ConfigService();
 
function load<T>(varName:string){
    return process.env[varName]
}

const AppDataSource = new DataSource({
    type: 'postgres',
    host: load<string>('DB_HOST'),
    port: parseInt(load<string>('DB_PORT') ?? "5432"),
    username: load<string>('DB_USERNAME'),
    password: load<string>('DB_PASSWORD'),
    database: load<string>('DB_NAME'),
    synchronize: false,
    entities: [__dirname + '../../Database/Schemas/*.schema{.ts,.js}'],
    migrations: [__dirname + '../../Database/Migrations/*-migration{.ts,.js}'],
    migrationsRun: false,
    logging: true,
});

console.log({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') ?? "5432"),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: false,
    entities: [__dirname + '/Database/Schemas/*.schemas{.ts,.js}'],
    migrations: [__dirname + '/Database/Migrations/*-migrations{.ts,.js}'],
    migrationsRun: false,
    logging: true,
})

export default AppDataSource;