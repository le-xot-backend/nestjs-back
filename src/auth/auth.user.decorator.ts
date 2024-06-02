import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const UserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
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
    return request.user;
  },
);
