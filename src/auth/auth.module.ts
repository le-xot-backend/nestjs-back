import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '1337',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
