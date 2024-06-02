import { Module } from '@nestjs/common';
import { AdminsService } from './admin.service';
import { AdminController } from './admins.controller';
import { PrismaModule } from 'src/db/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { CustomJwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [CustomJwtModule, PrismaModule, UsersModule],
  providers: [AdminsService],
  controllers: [AdminController],
})
export class AdminsModule {}
