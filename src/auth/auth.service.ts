import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/db/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    firstname: string,
    username: string,
    password: string,
    role: UserRole,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new HttpException(
        'User with username already exists',
        HttpStatus.CONFLICT,
      );
    }

    await this.prisma.user.create({
      data: {
        firstname,
        username,
        password: hashedPassword,
        role,
      },
    });
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { password: _, ...payload } = user;

    return await this.jwtService.signAsync(payload);
  }

  async quit(): Promise<void> {
    return;
  }
}
