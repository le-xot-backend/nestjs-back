import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomJwtModule } from 'src/app/jwt/jwt.module';
import { PrismaService } from 'src/db/prisma.service';
import { UsersModule } from 'src/app/users/users.module';
import { AuthResolver } from './auth.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerMicroserviceSymbol } from './auth.constants';

@Module({
  imports: [
    CustomJwtModule,
    UsersModule,
    ClientsModule.register([
      {
        name: LoggerMicroserviceSymbol,
        transport: Transport.RMQ,
      },
    ]),
  ],
  providers: [AuthService, PrismaService, AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}
