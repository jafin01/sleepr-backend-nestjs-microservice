import { ConfigService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDocument } from './users/models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    public readonly configService: ConfigService,
    public readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const payload = { username: user.email };

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
