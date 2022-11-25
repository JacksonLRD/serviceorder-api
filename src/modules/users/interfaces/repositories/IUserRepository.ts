import User from '../../domain/User';
import CreateUserDTO from '../dtos/CreateUserDTO';

export default interface IUserRepository {
  save(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
