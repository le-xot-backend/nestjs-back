import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  UserInjectSymbol,
  UserRepository,
} from 'src/repositores/users.repository';

@Injectable()
export class AdminsService {
  constructor(
    @Inject(UserInjectSymbol)
    private userRepository: UserRepository,
  ) {}

  async findOne(username: string): Promise<User> {
    const foundedUser = await this.userRepository.findByUsername(username);
    if (!foundedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundedUser;
  }

  async deleteUser(username: string): Promise<void> {
    const deletedUser = await this.userRepository.findByUsername(username);
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.deleteUser(username);
  }

  async findAll(): Promise<User[]> {
    const foundedUsers = await this.userRepository.findAll();
    if (!foundedUsers || foundedUsers.length === 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return foundedUsers;
  }

  async deleteAll(): Promise<void> {
    const deletedUsers = await this.userRepository.findAll();
    if (!deletedUsers) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.deleteAll();
  }
}
