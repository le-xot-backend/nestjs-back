import {
  HttpException,
  HttpStatus,
  Inject,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDecorator } from 'src/auth/auth.user.decorator';
import { User } from 'src/graphql';

import {
  UsersInjectSymbol,
  UsersRepository,
} from 'src/repositores/user.repository';

@UseGuards(AuthGuard)
@Resolver()
export class UsersResolver {
  constructor(
    @Inject(UsersInjectSymbol)
    private readonly usersRepository: UsersRepository,
  ) {}

  @Query(() => User)
  async me(@UserDecorator() user: User): Promise<User> {
    const foundedUser = await this.usersRepository.findByUsername(
      user.username,
    );
    if (!foundedUser) {
      throw new HttpException('Info not found', HttpStatus.NOT_FOUND);
    }
    return foundedUser;
  }
}
