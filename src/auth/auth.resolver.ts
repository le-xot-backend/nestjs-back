import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Login, Register } from 'src/graphql';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async register(@Args('input') input: Register): Promise<boolean> {
    const { firstname, username, password, role } = input;

    await this.authService.registerUser(firstname, username, password, role);
    return true;
  }

  @Mutation(() => String)
  async login(
    @Args('input') input: Login,
    @Context('res') response: Response,
  ): Promise<string> {
    const { username, password } = input;
    const token = await this.authService.login(username, password);
    response.cookie('token', token, {
      httpOnly: true,
    });

    return token;
  }
}
