import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, HttpStatus,
  Param,
  Post,
  Put, Res
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate as uuidValidate } from 'uuid';

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
      response.status(HttpStatus.BAD_REQUEST).end();

      return null;
    } else if (!searchedUser) {
      response.status(HttpStatus.NOT_FOUND).end();

      return null;
    } else {
      response.status(HttpStatus.OK).end(searchedUser);
    }

    return searchedUser;
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto, @Res() response: Response) {
    // Server should answer with status code 201 and newly created record if request is valid
    // Server should answer with status code 400 and corresponding message if request body does not contain required fields
    return await this.usersService.createUser(createUser);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.updatePasswordOfUser(id, updateUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() response: Response) {
    const isExistsDeletedUser = await this.usersService.getUserById(id);

    if (!uuidValidate(id)) {
      response.status(HttpStatus.BAD_REQUEST).end();
    } else if (!isExistsDeletedUser) {
      response.status(HttpStatus.NOT_FOUND).end();
    } else {
      response.status(HttpStatus.NO_CONTENT).end();
      await this.usersService.deleteUser(id);
    }
  }
}
