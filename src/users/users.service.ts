import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../repositores/user.entity';
import {
  UsersInjectSymbol,
  UsersRepository,
} from '../repositores/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersInjectSymbol) private usersRepository: UsersRepository,
  ) {}

  async returnUserInfo(username: string): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);
    if (!user) {
      throw new HttpException('Info not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
