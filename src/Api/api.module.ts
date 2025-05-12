import { config } from 'dotenv';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { APIProvider } from './api.provider';
import { JWTMiddleware } from './Middlewares/JWTMiddleware';
import { AreaController } from './Controllers/area.controller';
import { EventController } from './Controllers/event.controller';
import { User } from 'src/Infra/Database/Schemas/user.schema';
import { AuthController } from './Controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  providers: APIProvider.services,
  controllers:APIProvider.controllers
})
export class ApiModule {
  configure(consumer:MiddlewareConsumer) {
    consumer
      .apply(JWTMiddleware)
      .exclude(
        '/auth',
        '/auth/register'
      )
      .forRoutes(
        AreaController,
        EventController,
        AuthController
      )
  }
}
