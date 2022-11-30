import { readFileSync } from 'node:fs';
import { env } from 'process';

import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import AppError from '../../errors/AppError';
import routes from '../routes';

const createMiddlewares = (app: express.Express): void => {
  const { NODE_ENV } = env;

  const swaggerFile = './src/shared/swagger/swagger.json';
  const swaggerData = readFileSync(swaggerFile, 'utf8');
  const swaggerDocument = JSON.parse(swaggerData);

  void (NODE_ENV !== 'test' && app.use(morgan('dev')));

  app.use(cors());
  app.use(express.json({ type: 'application/json' }), express.urlencoded({ extended: true }));
  app.use(routes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return res.status(error.status).json({ status: 'error', message: error.message });
    }
    next(error);
  });
};

export default createMiddlewares;
