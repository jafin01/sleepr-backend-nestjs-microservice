import { ConfigService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('auth').jwt.secret,
    });
  }

  async validate({ userId }: TokenPayload) {
    const user = await this.usersService.getUser({ _id: userId });
    return user;
  }
}
