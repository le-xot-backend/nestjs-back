import { Module } from '@nestjs/common';
import { AdminsModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './db/prisma.module';
import { GqlModule } from './graphql/graphql.module';

@Module({
  imports: [AuthModule, AdminsModule, PrismaModule, UsersModule, GqlModule],
})
export class AppModule {}
