import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AdminsService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) {}

  async findOne(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async deleteUser(username: string): Promise<void> {
    const user = await this.prisma.user.delete({ where: { username } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    if (!users || users.length === 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async deleteAll(): Promise<void> {
    const users = await this.prisma.user.deleteMany();
    if (!users || users.count === 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
  }
}
