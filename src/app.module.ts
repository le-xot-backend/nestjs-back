import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './db/prisma.module';

@Module({
  imports: [AuthModule, AdminsModule, PrismaModule, UsersModule],
  controllers: [],
})
export class AppModule {}
