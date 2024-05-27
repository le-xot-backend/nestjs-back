import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { User, UserRole } from '@prisma/client';
import { UsersService } from './user.service';
import { UserDecorator } from 'src/auth/auth.user.decorator';

@ApiTags('users')
@UseGuards(AuthGuard, new RolesGuard([UserRole.USER, UserRole.ADMIN]))
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('info')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Info found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Info not found' })
  async returnUserInfo(@UserDecorator() user: User) {
    return this.usersService.returnUserInfo(user.username);
  }
}
