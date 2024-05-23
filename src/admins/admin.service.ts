import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/entity.user';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}

  async findOne(username: string): Promise<User> {
    const usersRepository = this.dataSource.getRepository(User);
    const user = await usersRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async deleteUser(username: string): Promise<void> {
    const usersRepository = this.dataSource.getRepository(User);
    const users = await usersRepository.delete({ username });
    if (users.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return;
  }
  async findAll(): Promise<User[]> {
    const usersRepository = this.dataSource.getRepository(User);
    const users = await usersRepository.find();
    if (users.length === 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }
  async deleteAll(): Promise<void> {
    const usersRepository = this.dataSource.getRepository(User);
    const users = await usersRepository.delete({});
    if (users.affected === 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
  }
}
