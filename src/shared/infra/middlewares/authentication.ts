import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import TokenPayload from '../../../modules/users/interfaces/payload/TokenPayload';

import RequestWithUserData from '../types/RequestWithUserData';

export const authentication = (req: RequestWithUserData, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send('User Unauthorized');
    return;
  }

  try {
    const payload = verify(authorization, authConfig.jwt.secret) as TokenPayload;
    req.user = payload;
  } catch (error) {
    res.status(403).send('Usuário não permitido');
    return;
  }

  next();
};
