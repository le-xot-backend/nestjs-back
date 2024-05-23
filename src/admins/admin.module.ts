import { Module } from '@nestjs/common';
import { AdminsService } from './admin.service';
import { AdminController } from './admins.controller';

@Module({
  providers: [AdminsService],
  controllers: [AdminController],
})
export class AdminsModule {}
