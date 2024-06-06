import { Injectable } from '@nestjs/common';
import { AuthLoggerRepository } from './authLogger.repository';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PrismaAuthLoggerRepository implements AuthLoggerRepository {
  constructor(private prisma: PrismaService) {}

  async createRecord(userId: number): Promise<void> {
    await this.prisma.authLogger.create({ data: { userId } });
  }
}
