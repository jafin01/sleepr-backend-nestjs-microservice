import { ConfigService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ExtractJwt } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.cookies?.Authentication ||
          request?.Authentication ||
          request?.headers?.authentication,
      ]),
      secretOrKey: configService.get('auth').jwt.secret,
    });
  }

  async validate({ userId }: TokenPayload) {
    const user = await this.usersService.getUser({ _id: userId });
    return user;
  }
}
