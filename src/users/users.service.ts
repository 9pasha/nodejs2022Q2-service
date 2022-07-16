import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { dataBase } from '../dataBase';

@Injectable()
export class UsersService {
  async getAllUsers(): Promise<Array<UserInterface>> {
    const users = [...dataBase.users];

    return users;
  }

  async getUserById(id): Promise<UserInterface> {
    return dataBase.users.find((user) => user.id === id);
  }

  async deleteUser(id): Promise<void> {
    dataBase.users = dataBase.users.filter((user) => id !== user.id);
  }

  async createUser(user: CreateUserDto): Promise<UserInterface> {
    const createdUser: UserInterface = {
      ...user,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    dataBase.users.push(createdUser);

    return createdUser;
  }

  async updatePasswordOfUser(id: string, user: UpdateUserDto): Promise<void> {
    dataBase.users.forEach((currentUser: UserInterface) => {
      if (id === currentUser.id) {
        currentUser.password = user.newPassword;
      }
    });
  }
}
