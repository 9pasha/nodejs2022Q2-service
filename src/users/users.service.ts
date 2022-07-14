import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { usersDataBase } from './usersDataBase';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async getAllUsers(): Promise<Array<UserInterface>> {
    return usersDataBase.users;
  }

  async getUserById(id): Promise<UserInterface> {
    return usersDataBase.users.find((user: UserInterface) => user.id === id);
  }

  async deleteUser(id): Promise<void> {
    usersDataBase.users = usersDataBase.users.filter((user) => id === user.id);
  }

  async createUser(user: CreateUserDto): Promise<UserInterface> {
    const createdUser: UserInterface = {
      ...user,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    usersDataBase.users.push(createdUser);

    return createdUser;
  }

  async updatePasswordOfUser(id: string, user: UpdateUserDto): Promise<void> {
    usersDataBase.users.forEach((currentUser: UserInterface) => {
      if (id === currentUser.id) {
        currentUser.password = user.newPassword;
      }
    });
  }
}
