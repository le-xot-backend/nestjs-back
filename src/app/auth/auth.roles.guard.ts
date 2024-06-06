import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../repositores/user.entity.roles';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private roles: UserRole[]) {}

  canActivate(context: ExecutionContext): boolean {
    let request: Request;

    const type = context.getType();

    if (type === 'http') {
      request = context.switchToHttp().getRequest();
    } else if ((type as GqlContextType) === 'graphql') {
      request = GqlExecutionContext.create(context).getContext().req;
    } else {
      throw new Error('Invalid context type');
    }
    // @ts-ignore
    const user = request.user;
    return this.roles.includes(user.role);
  }
}
