import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { environments } from 'src/utils/environment';

const RegisteredJwtModule = JwtModule.register({
  secret: environments.jwtSecret,
  signOptions: { expiresIn: '30m' },
});

@Module({
  imports: [RegisteredJwtModule],
  providers: [JwtService],
  exports: [RegisteredJwtModule],
})
export class CustomJwtModule {}
