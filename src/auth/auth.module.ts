import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/db/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { environments } from 'src/environment';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: environments.jwtSecret,
      signOptions: { expiresIn: '30m' },
    }),
    UsersModule,
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
