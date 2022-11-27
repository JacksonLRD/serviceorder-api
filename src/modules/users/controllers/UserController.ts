import { Request, Response } from 'express';
import Container from 'typedi';
import AppError from '../../../shared/errors/AppError';
import ICreateUserService from '../interfaces/services/ICreateUserService';

export default class UserController {
  public static async create(req: Request, res: Response) {
    try {
      const createUserService = Container.get<ICreateUserService>('CreateUserService');

      const userData = req.body;
      const user = await createUserService.execute(userData);

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) throw error;

      console.error(error);
      throw new AppError('Internal Server Error', 500);
    }
  }
}
