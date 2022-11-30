import { Service } from 'typedi';
import User from '../../../domain/User';
import CreateUserDTO from '../../../interfaces/dtos/CreateUserDTO';
import IUserRepository from '../../../interfaces/repositories/IUserRepository';
import UserMapper from '../dataMapper/UserMapper';
import UserModel from '../schemas/User';

@Service('UserRepository')
export default class UserRepository implements IUserRepository {
  public async save(data: CreateUserDTO): Promise<User> {
    const userCreated = await UserModel.create(UserMapper.toPersistence(data));

    return UserMapper.toDomain(userCreated);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    if (user === null) return null;
    return UserMapper.toDomain(user);
  }
}
