import { sign } from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import hashProvider from '../providers/hashProvider/hashProvider';
import IUserAuthenticationService from '../interfaces/services/IUserAuthenticationService';
import TokenPayLoad from '../interfaces/payload/TokenPayload';
import UserPayload from '../interfaces/payload/UserPayload';

@Service('UserAuthenticationService')
export default class UserAuthenticationService implements IUserAuthenticationService {
  constructor(@Inject('UserRepository') private userRepository: IUserRepository) {}

  public async execute(payload: UserPayload): Promise<string> {
    const { email, password } = payload;

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('Incorrect password or email', 422);

    const { id, name, role, active, password: hashPassword } = user;
    if (!active) throw new AppError('User Unauthorized', 401);

    const checkedPasswords = await hashProvider.compareHash(password, hashPassword);
    if (!checkedPasswords) throw new AppError('Incorrect password or email', 422);

    const { secret, expiresIn } = authConfig.jwt;

    return sign({ id, name, role, active } as TokenPayLoad, secret, { expiresIn });
  }
}
