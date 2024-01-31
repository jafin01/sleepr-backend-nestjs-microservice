import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    this.userRepository.create({
      ...createUserDto,
      timestamps: new Date(),
    });
  }
}
