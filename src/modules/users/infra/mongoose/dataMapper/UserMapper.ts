import User from '../../../domain/User';
import CreateUserDTO from '../../../interfaces/dtos/CreateUserDTO';
import { IUser } from '../schemas/User';

export default class UserMapper {
  public static toPersistence(userDTO: CreateUserDTO): IUser {
    const { name, email, password, active, role } = userDTO;

    return {
      name,
      email,
      password,
      active,
      role,
    };
  }

  public static toDomain(user: IUser): User {
    const { _id, name, email, password, active, role, createdAt, updatedAt } = user;
    return new User(name, email, password, active, role, _id, createdAt, updatedAt);
  }
}
