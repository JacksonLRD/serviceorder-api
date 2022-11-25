import { Request, Response } from 'express';
import Container from 'typedi';
import ICreateUserService from '../interfaces/services/ICreateUserService';

export default class UserController {
  public static async create(req: Request, res: Response) {
    try {
      const createUserService = Container.get<ICreateUserService>('CreateUserService');

      const userData = req.body;
      const user = await createUserService.execute(userData);

      return res.status(201).json(user);
    } catch (error) {}
  }
}
