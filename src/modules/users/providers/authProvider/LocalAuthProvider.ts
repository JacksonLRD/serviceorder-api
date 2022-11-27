import { env } from 'process';

import { sign } from 'jsonwebtoken';
import { Inject, Service } from 'typedi';
import AppError from '../../../../shared/errors/AppError';
import IUserRepository from '../../interfaces/repositories/IUserRepository';
import hashProvider from '../hashProvider/hashProvider';
import ILocalAuthProvider from './ILocalAuthProvider';
import TokenPayLoad from './TokenPayload';
import UserPayload from './UserPayload';

@Service('LocalAuthProvider')
export default class LocalAuthProvider implements ILocalAuthProvider {
  constructor(@Inject('UserRepository') private userRepository: IUserRepository) {}

  public async authenticate(payload: UserPayload): Promise<string> {
    const { email, password } = payload;
    const { JWT_SECRET } = env;
    if (!JWT_SECRET) throw new AppError('missing JWT_SECRET env', 400);

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('Incorrect password or email', 422);

    const { id, name, role, active, password: hashPassword } = user;

    const checkedPasswords = await hashProvider.compareHash(password, hashPassword);
    if (!checkedPasswords) throw new AppError('Incorrect password or email', 422);

    return sign({ id, name, role, active } as TokenPayLoad, JWT_SECRET);
  }
}
