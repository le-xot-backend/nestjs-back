import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { AuthLoggerController } from './authLogger.controller';
import { LoggerInjectSymbol } from './repositories/authLogger.repository';
import { PrismaAuthLoggerRepository } from './repositories/authLogger.repository.prisma';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: LoggerInjectSymbol, useClass: PrismaAuthLoggerRepository },
  ],
  controllers: [AuthLoggerController],
})
export class AuthLoggerModule {}
