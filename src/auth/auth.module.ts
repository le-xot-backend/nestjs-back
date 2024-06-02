import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomJwtModule } from 'src/jwt/jwt.module';
import { PrismaService } from 'src/db/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [CustomJwtModule, UsersModule],
  providers: [AuthService, PrismaService, AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}
