import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../repositores/user.entity';
import {
  UserInjectSymbol,
  UserRepository,
} from '../repositores/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserInjectSymbol) private userRepository: UserRepository,
  ) {}

  async returnUserInfo(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new HttpException('Info not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
