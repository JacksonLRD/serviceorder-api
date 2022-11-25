import User from '../../domain/User';
import CreateUserDTO from '../dtos/CreateUserDTO';

export default interface ICreateUserService {
  execute(data: CreateUserDTO): Promise<User>;
}
