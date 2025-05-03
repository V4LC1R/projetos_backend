import { Module } from '@nestjs/common';

import { APIProvider } from './api.provider';

@Module({
  imports: [],
  providers: APIProvider.services,
  controllers:APIProvider.controllers
})
export class ApiModule {}
