import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admin.module';
import { PostrgesModule } from './db/postgres.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, AdminsModule, PostrgesModule, UsersModule],
  controllers: [],
})
export class AppModule {}
