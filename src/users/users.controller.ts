import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res, UseGuards
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate as uuidValidate } from 'uuid';
import { Response } from "express";
import { validate } from "class-validator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();

    users.forEach((user) => {
      user.createdAt = Number(user.createdAt);
      user.updatedAt = Number(user.updatedAt);
    });

    return users;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string, @Res() response: Response) {
    const searchedUser = await this.usersService.getUserById(id);

    if (!uuidValidate(id)) {
      const error = `Error: userId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedUser) {
      const error = `Error: record with id === userId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.OK)
        .end(JSON.stringify(searchedUser));
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() user: CreateUserDto, @Res() response: Response) {
    let createdUser = null;

    await validate(user);

    createdUser = await this.usersService.createUser(user);

    const createdUserWithoutPassword = { ...createdUser };
    delete createdUserWithoutPassword.password;

    response
      .set({ 'Content-Type': 'application/json' })
      .status(HttpStatus.CREATED)
      .end(JSON.stringify(createdUserWithoutPassword));

    return createdUser;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
    @Res() response: Response,
  ) {
    const searchedUser = await this.usersService.getUserById(id);

    if (
      !uuidValidate(id) ||
      !updateUser.hasOwnProperty('oldPassword') ||
      !updateUser.hasOwnProperty('newPassword')
    ) {
      response.status(HttpStatus.BAD_REQUEST).end();
    } else if (!searchedUser) {
      response.status(HttpStatus.NOT_FOUND).end();
    } else if (searchedUser.password !== updateUser.oldPassword) {
      const error = `Error: User password doesn't match with user previous password`;

      response.status(HttpStatus.FORBIDDEN).end(error);
    } else {
      const updatedUser = await this.usersService.updatePasswordOfUser(
        id,
        updateUser,
      );

      const updatedUserWithoutPassword = { ...updatedUser };

      updatedUserWithoutPassword.createdAt = Number(
        updatedUserWithoutPassword.createdAt,
      );
      updatedUserWithoutPassword.updatedAt = Number(
        updatedUserWithoutPassword.updatedAt,
      );
      delete updatedUserWithoutPassword.password;

      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.OK)
        .end(JSON.stringify(updatedUserWithoutPassword));
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string, @Res() response: Response) {
    const isExistsDeletedUser = await this.usersService.getUserById(id);

    if (!uuidValidate(id)) {
      const error = `Error: userId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!isExistsDeletedUser) {
      const error = `Error: record with id === userId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      response.status(HttpStatus.NO_CONTENT).end();
      await this.usersService.deleteUser(id);
    }
  }
}
