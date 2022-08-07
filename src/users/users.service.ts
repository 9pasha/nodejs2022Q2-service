import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../schemas/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<Array<UserEntity>> {
    return await this.usersRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ id });
  }

  async deleteUser(id): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const createdUser: UserEntity = new UserEntity();

    createdUser.id = uuid();
    createdUser.password = user.password;
    createdUser.login = user.login;
    createdUser.version = 1;
    createdUser.createdAt = Date.now();
    createdUser.updatedAt = Date.now();

    return await this.usersRepository.save(createdUser);
  }

  async updatePasswordOfUser(
    id: string,
    user: UpdateUserDto,
  ): Promise<UserInterface | null> {
    const oldUser = await this.getUserById(id);

    await this.usersRepository.update(id, {
      password: user.newPassword,
      version: oldUser.version + 1,
      updatedAt: Date.now(),
    });

    return await this.getUserById(id);
  }
}
