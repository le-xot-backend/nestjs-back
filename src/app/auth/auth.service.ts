import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRole } from '../repositores/user.entity.roles';
import bcrypt from 'bcrypt';
import {
  UsersInjectSymbol,
  UsersRepository,
} from 'src/app/repositores/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoggerMicroserviceSymbol } from './auth.constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersInjectSymbol)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    @Inject(LoggerMicroserviceSymbol) private client: ClientProxy,
  ) {}

  async registerUser(
    firstname: string,
    username: string,
    password: string,
    role: UserRole,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.usersRepository.findByUsername(username);
    if (existingUser) {
      throw new HttpException(
        'User with username already exists',
        HttpStatus.CONFLICT,
      );
    }

    await this.usersRepository.createUser({
      firstname,
      username,
      password: hashedPassword,
      role,
    });
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.usersRepository.findByUsername(username);

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

    this.client.emit('new-login', payload.id);

    return await this.jwtService.signAsync(payload);
  }
}
