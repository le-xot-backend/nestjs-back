import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomJwtModule } from 'src/jwt/jwt.module';
import { PrismaService } from 'src/db/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [CustomJwtModule, UsersModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
