import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { IRefreshPayloadInterface } from './interfaces/refresh-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() user: CreateUserDto) {
    return await this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() payload: IRefreshPayloadInterface) {
    // return await this.authService.refresh(payload);
  }
}
