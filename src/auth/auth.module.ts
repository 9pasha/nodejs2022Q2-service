import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import 'dotenv/config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register(({
      secret: process.env.JWT_SECRET_KEY || 'my_secret',
      signOptions: {
        expiresIn: '2h'
      }
    }))
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
