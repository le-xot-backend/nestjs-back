import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User, UserRole } from 'src/entities/entity.user';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    firstname: string,
    username: string,
    password: string,
    role: UserRole,
  ): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);

    const userWithSameUsername = await userRepository.findOneBy({ username });
    if (userWithSameUsername) {
      throw new HttpException(
        'User with username already exists',
        HttpStatus.CONFLICT,
      );
    }

    const isValidRole = Object.values(UserRole).includes(role);
    if (!isValidRole) {
      throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepository.save({
      firstname,
      username,
      password: hashedPassword,
      role,
    });
  }

  async login(username: string, password: string): Promise<string> {
    const usersRepository = this.dataSource.getRepository(User);
    const user = await usersRepository.findOneBy({ username });
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
