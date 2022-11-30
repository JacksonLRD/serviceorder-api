import { Inject, Service } from 'typedi';
import AppError from '../../../shared/errors/AppError';
import User from '../domain/User';
import { RoleEnum } from '../Enums/RoleEnum';
import createUserSchema from '../infra/joiSchemas/createUserSchema';
import CreateUserDTO from '../interfaces/dtos/CreateUserDTO';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import ICreateUserService from '../interfaces/services/ICreateUserService';
import hashProvider from '../providers/hashProvider/hashProvider';

@Service('CreateUserService')
export default class CreateUserService implements ICreateUserService {
  constructor(@Inject('UserRepository') private userRepository: IUserRepository) {}

  public async execute(data: CreateUserDTO): Promise<Omit<User, 'password'>> {
    // const { name, email, password, role, active } = data;

    const { error } = createUserSchema.validate(data);
    if (error) throw new AppError(JSON.stringify(error.message), 422);

    const user = await this.userRepository.findByEmail(data.email);
    if (user) throw new AppError('Email address already used', 422);

    const hashedPassword = await hashProvider.generateHash(data.password);

    const createdUser = await this.userRepository.save({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      ...(!data.role && { role: RoleEnum.TECHNICIAN }),
      ...(!data.active && { active: true }),
    });

    const { id, name, email, password, role, active, createdAt, updatedAt } = createdUser;

    return {
      id,
      name,
      email,
      role,
      active,
      createdAt,
      updatedAt,
    };
  }
}
