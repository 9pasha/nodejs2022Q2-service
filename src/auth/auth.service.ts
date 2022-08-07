import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(user: CreateUserDto) {
    // const CRYPT_SALT = process.env.CRYPT_SALT || 10;

    const hash = await argon2.hash(user.password);

    user.password = hash;

    await this.usersService.createUser(user);
  }
}
