import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
export class RegisterUserDTO {
  @ApiProperty({ example: 'John' })
  firstname: string;

  @ApiProperty({ example: 'john123' })
  username: string;

  @ApiProperty({ example: '12345' })
  password: string;

  @ApiProperty({ example: UserRole.USER })
  role: UserRole;
}

export class LoginUserDTO {
  @ApiProperty({ example: 'john123' })
  username: string;

  @ApiProperty({ example: '12345' })
  password: string;
}
