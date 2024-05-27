import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import {
  PrismaUserRepository,
  UserInjectSymbol,
} from '../repositores/users.repository';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: UserInjectSymbol, useClass: PrismaUserRepository },
    UsersService,
  ],
  controllers: [UserController],
  exports: [UserInjectSymbol],
})
export class UsersModule {}
