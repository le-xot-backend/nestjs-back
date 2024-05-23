import { Global, Module } from '@nestjs/common';

import { databaseProviders } from 'src/db/database.providers';
@Global()
@Module({
  providers: [...databaseProviders],
  exports: ['DATA_SOURCE'],
})
export class PostrgesModule {}
