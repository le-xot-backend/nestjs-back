import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO, LoginUserDTO } from 'src/app/auth/auth.dtos';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with username already exists',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid role' })
  async registerUser(
    @Body()
    userData: RegisterUserDTO,
  ): Promise<void> {
    const { firstname, username, password, role } = userData;
    return this.authService.registerUser(firstname, username, password, role);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged in' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid user' })
  async login(
    @Body()
    userData: LoginUserDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const { username, password } = userData;
    const token = await this.authService.login(username, password);
    response.cookie('token', token, {
      httpOnly: true,
    });
    return token;
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged out' })
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('token');
  }
}
