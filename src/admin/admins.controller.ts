import {
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AdminsService } from './admin.service';
import { User } from '../repositores/user.entity';
import { UserRole } from '../repositores/user.entity.roles';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.roles.guard';

@ApiTags('admin')
@UseGuards(AuthGuard, new RolesGuard([UserRole.ADMIN]))
@Controller('admin/users')
export class AdminController {
  constructor(private adminsService: AdminsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Users found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Users not found' })
  async findAll(): Promise<User[]> {
    return this.adminsService.findAll();
  }

  @Delete()
  @ApiQuery({ name: 'role', enum: UserRole, required: false })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Users deleted' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Users not found' })
  async deleteAll(@Query('role') role?: UserRole): Promise<void> {
    return this.adminsService.deleteAll(role);
  }

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'User found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async findOne(@Param('username') username: string): Promise<User> {
    return this.adminsService.findOne(username);
  }

  @Delete(':username')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async deleteUser(@Param('username') username: string): Promise<void> {
    return this.adminsService.deleteUser(username);
  }
}
