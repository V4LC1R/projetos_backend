import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {config} from 'dotenv';
config()

const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') ?? "5432"),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: true,
    dropSchema:true,
    entities: [__dirname + '../../Database/Schemas/*.schema{.ts,.js}'],
    migrations: [__dirname + '../../Database/Migrations/*-migration{.ts,.js}'],
    migrationsRun: false,
    logging: true,
});

export default AppDataSource;