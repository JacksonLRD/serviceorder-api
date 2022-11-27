import { Request, Response } from 'express';
import Container from 'typedi';

import AppError from '../../../../../shared/errors/AppError';
import ICreateUserService from '../../../interfaces/services/ICreateUserService';
import IUserAuthenticationService from '../../../interfaces/services/IUserAuthenticationService';

export default class UserController {
  public static async create(req: Request, res: Response) {
    try {
      const createUserService = Container.get<ICreateUserService>('CreateUserService');

      const user = await createUserService.execute(req.body);

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) throw error;

      console.error('Error:', error);
      throw new AppError('Internal Server Error', 500);
    }
  }

  public static async authenticate(req: Request, res: Response) {
    try {
      const userAuthenticationService = Container.get<IUserAuthenticationService>(
        'UserAuthenticationService'
      );

      const token = await userAuthenticationService.execute(req.body);

      return res.status(200).json(token);
    } catch (error) {
      if (error instanceof AppError) throw error;

      console.error('Error:', error);
      throw new AppError('Internal Server Error', 500);
    }
  }
}
