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
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate as uuidValidate } from 'uuid';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() response: Response) {
    const searchedUser = await this.usersService.getUserById(id);

    if (!uuidValidate(id)) {
      const error = `Error: userId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedUser) {
      const error = `Error: record with id === userId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      response.status(HttpStatus.OK).end(JSON.stringify(searchedUser));
    }
  }

  @Post()
  async createUser(@Body() user: CreateUserDto, @Res() response: Response) {
    let createdUser = null;

    if (!user.hasOwnProperty('login') || !user.hasOwnProperty('password')) {
      const error = `Error: User object doesn't contain required fields`;

      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else {
      createdUser = await this.usersService.createUser(user);
      response.status(HttpStatus.CREATED).end(JSON.stringify(createdUser));
    }

    return createdUser;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
    @Res() response: Response,
  ) {
    const searchedUser = await this.usersService.getUserById(id);

    if (!uuidValidate(id)) {
      response.status(HttpStatus.BAD_REQUEST).end();
    } else if (!searchedUser) {
      response.status(HttpStatus.NOT_FOUND).end();
    } else if (searchedUser.password !== updateUser.oldPassword) {
      const error = `Error: User password doesn't match with user previous password`;

      response.status(HttpStatus.FORBIDDEN).end(error);
    } else {
      response.status(HttpStatus.OK).end(searchedUser);
      await this.usersService.updatePasswordOfUser(id, updateUser);
    }
  }

  @Delete(':id')
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
