import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UserController],
})
export class UsersModule {}
