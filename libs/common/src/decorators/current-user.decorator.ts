import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../models';

function getCurrentUser(ctx: ExecutionContext): UserDocument {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUser(ctx),
);
