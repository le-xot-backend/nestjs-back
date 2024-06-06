import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  AuthLoggerRepository,
  LoggerInjectSymbol,
} from './repositories/authLogger.repository';

@Controller('logger')
export class AuthLoggerController {
  private readonly logger = new Logger(AuthLoggerController.name);
  constructor(
    @Inject(LoggerInjectSymbol) private loggerRepository: AuthLoggerRepository,
  ) {}
  @EventPattern('new-login')
  async handleLogin(userId: number) {
    await this.loggerRepository.createRecord(userId);
    this.logger.log(`User ${userId} logged in.`);
  }
}
