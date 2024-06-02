import { PrismaService } from 'src/db/prisma.service';
import { User } from './user.entity';
import { User as PrismaUser } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UserRole } from './user.entity.roles';
import { UsersRepository } from './user.repository';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  private convertUser(user: PrismaUser): User {
    return { ...user, role: UserRole[user.role] };
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const createdUser = await this.prisma.user.create({ data: user });
    return this.convertUser(createdUser);
  }
  async findByUsername(username: string): Promise<User | null> {
    const foundedUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!foundedUser) {
      return null;
    }
    return this.convertUser(foundedUser);
  }

  async findAll(): Promise<User[]> {
    const foundedUsers = await this.prisma.user.findMany();
    return foundedUsers.map((user) => this.convertUser(user));
  }

  async deleteUser(username: string): Promise<void> {
    await this.prisma.user.delete({ where: { username } });
  }

  async deleteAll(): Promise<void> {
    await this.prisma.user.deleteMany();
  }
}
