import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { environments } from '../environment';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request: Request;

    const type = context.getType();

    if (type === 'http') {
      request = context.switchToHttp().getRequest();
    } else if ((type as GqlContextType) === 'graphql') {
      request = GqlExecutionContext.create(context).getContext().req;
    } else {
      throw new Error('Invalid context type');
    }
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: environments.jwtSecret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(request: Request): string | undefined {
    return request.cookies['token'];
  }
}
