import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { compare, genSalt, hash } from "bcrypt";
import 'dotenv/config';
import { JwtService } from "@nestjs/jwt";

interface IAccessTokenPayload {
  login: string,
  userId: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(user: CreateUserDto) {
    const CRYPT_SALT = process.env.CRYPT_SALT || 10;
    const salt = await genSalt(Number(CRYPT_SALT));
    const hashOfPassword = await hash(user.password, salt);

    user.password = hashOfPassword;

    return await this.usersService.createUser(user);
  }

  async login(user: CreateUserDto) {
    const alreadyExistsUser =
      await this.usersService.getUserByLogin(user.login);
    const isEqualPassword =
      await compare(user.password, alreadyExistsUser.password);

    if (alreadyExistsUser && isEqualPassword) {
      return this.generateToken(
        { userId: alreadyExistsUser.id, login: user.login },
        { userId: alreadyExistsUser.id, login: user.login }
      );
    }

    throw new UnauthorizedException({ message: 'Check your password or login' });
  }

  async generateToken(payloadForAccessToken: IAccessTokenPayload, payloadForRefreshToken: IAccessTokenPayload) {
    return {
      access_token: this.jwtService.sign({payloadForAccessToken}),
      refresh_token: this.jwtService.sign({payloadForRefreshToken}),
    }
  }
}
