import { HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { User as QueryUser, User, UserRole } from 'src/graphql';

import {
  UsersInjectSymbol,
  UsersRepository,
} from 'src/repositores/user.repository';

@UseGuards(AuthGuard, new RolesGuard([UserRole.ADMIN]))
@Resolver()
export class AdminResolver {
  constructor(
    @Inject(UsersInjectSymbol)
    private readonly usersRepository: UsersRepository,
  ) {}

  @Query(() => QueryUser)
  async user(@Args('username') username: string): Promise<User> {
    const foundedUser = await this.usersRepository.findByUsername(username);
    if (!foundedUser) {
      throw new HttpException('Info not found', HttpStatus.NOT_FOUND);
    }
    return foundedUser;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('username') username: string): Promise<boolean> {
    const deletedUser = await this.usersRepository.findByUsername(username);
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.deleteUser(username);
    return true;
  }

  @Query(() => QueryUser)
  async users(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  @Mutation(() => Boolean)
  async deleteAll(): Promise<boolean> {
    const deletedUsers = await this.usersRepository.findAll();
    if (!deletedUsers) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.deleteAll();
    return true;
  }
}
