import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersInjectSymbol } from '../repositores/user.repository';
import { PrismaModule } from 'src/db/prisma.module';
import { CustomJwtModule } from 'src/app/jwt/jwt.module';
import { UsersResolver } from './users.resolver';
import { PrismaUserRepository } from 'src/app/repositores/user.repository.prisma';

@Module({
  imports: [CustomJwtModule, PrismaModule],
  providers: [
    { provide: UsersInjectSymbol, useClass: PrismaUserRepository },
    UsersService,
    UsersResolver,
  ],
  controllers: [UsersController],
  exports: [UsersInjectSymbol],
})
export class UsersModule {}
