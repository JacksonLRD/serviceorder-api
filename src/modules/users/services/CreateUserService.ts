import { Service } from 'typedi';
import { Inject } from 'typedi/types/decorators/inject.decorator';
import AppError from '../../../shared/errors/AppError';
import User from '../domain/User';
import createUserSchema from '../infra/joiSchemas/createUserSchema';
import CreateUserDTO from '../interfaces/dtos/CreateUserDTO';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import ICreateUserService from '../interfaces/services/ICreateUserService';
import hashProvider from '../providers/hashProvider/hashProvider';

@Service('CreateUserService')
export default class CreateUserService implements ICreateUserService {
  constructor(@Inject('UserRepository') private userRepository: IUserRepository) {}

  public async execute(data: CreateUserDTO): Promise<User> {
    const { name, email, password, role, active } = data;

    const { error } = createUserSchema.validate(data);
    if (error) throw new AppError(JSON.stringify(error.message), 422);

    const user = await this.userRepository.findByEmail(email);
    if (user) throw new AppError('Email address already used', 422);

    const hashedPassword = await hashProvider.generateHash(password);

    return this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      ...(!role && { role: 'TECHNICIAN' }),
      ...(!active && { active: true }),
    });
  }
}
