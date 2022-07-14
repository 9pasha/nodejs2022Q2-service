import { UserInterface } from './interfaces/user.interface';

interface UsersDataBaseInterface {
  users: Array<UserInterface>;
}

export const usersDataBase: UsersDataBaseInterface = {
  users: [],
};
