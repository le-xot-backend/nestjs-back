import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../repositores/user.entity';
import {
  UsersInjectSymbol,
  UsersRepository,
} from 'src/repositores/user.repository';

@Injectable()
export class AdminsService {
  constructor(
    @Inject(UsersInjectSymbol)
    private usersRepository: UsersRepository,
  ) {}

  async findOne(username: string): Promise<User> {
    const foundedUser = await this.usersRepository.findByUsername(username);
    if (!foundedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundedUser;
  }

  async deleteUser(username: string): Promise<void> {
    const deletedUser = await this.usersRepository.findByUsername(username);
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.deleteUser(username);
  }

  async findAll(): Promise<User[]> {
    const foundedUsers = await this.usersRepository.findAll();
    if (!foundedUsers || foundedUsers.length === 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return foundedUsers;
  }

  async deleteAll(): Promise<void> {
    const deletedUsers = await this.usersRepository.findAll();
    if (!deletedUsers) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.deleteAll();
  }
}
