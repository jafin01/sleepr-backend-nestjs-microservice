import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  signup(createUserDto: CreateUserDto) {
    return 'user signup successfull';
  }
}
