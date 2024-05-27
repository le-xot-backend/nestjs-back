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
import { User } from '../repositores/user.entity';
import { UserRole } from '../repositores/user.entity.roles';
import { UsersService } from './users.service';
import { UserDecorator } from 'src/auth/auth.user.decorator';

@ApiTags('users')
@UseGuards(AuthGuard, new RolesGuard([UserRole.USER, UserRole.ADMIN]))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('info')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Info found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Info not found' })
  async returnUserInfo(@UserDecorator() user: User) {
    return this.usersService.returnUserInfo(user.username);
  }
}
