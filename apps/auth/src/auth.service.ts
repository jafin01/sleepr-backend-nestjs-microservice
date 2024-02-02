import { ConfigService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDocument } from './users/models/user.schema';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    public readonly configService: ConfigService,
    public readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const payload: TokenPayload = { userId: user._id.toHexString() };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('auth').jwt.expiresIn,
    );

    const token = await this.jwtService.sign(payload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
