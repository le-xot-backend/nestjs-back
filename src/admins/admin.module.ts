import { Module } from '@nestjs/common';
import { AdminsService } from './admin.service';
import { AdminController } from './admins.controller';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  providers: [AdminsService, PrismaService],
  controllers: [AdminController],
})
export class AdminsModule {}
