import { Module } from '@nestjs/common';
import { AdminsService } from './admin.service';
import { AdminController } from './admins.controller';
import { PrismaModule } from 'src/db/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [AdminsService],
  controllers: [AdminController],
})
export class AdminsModule {}
