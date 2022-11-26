import 'express-async-errors';
import 'reflect-metadata';
import '../infra/dependencies/dependencyInjector';
import 'dotenv/config';
import { env } from 'process';
import express from 'express';

import createMiddlewares from '../infra/middlewares/middlewares';
import * as dbConnection from '../infra/database/dbConnection';

const { PORT } = env;
const port = PORT ?? 3300;

const app = express();
createMiddlewares(app);

const server = app.listen(port, async (): Promise<void> => {
  console.info('Connecting on Mongo Database');
  await dbConnection.connect();
  console.info('Mongo database connected!');

  console.info(`Application running on port ${port}`);
});

function shutDown(event: string) {
  return (code: number | string) => {
    console.info(`Received kill signal, shutting down gracefully.\nEvent: ${event}\nCode: ${code}`);
    server.close(async () => {
      console.info('\nClosed out remaining connections');
      await dbConnection.close();

      process.exit(0);
    });
  };
}

process.on('SIGINT', shutDown('SIGINT'));

process.on('SIGTERM', shutDown('SIGTERM'));

process.on('exit', (code) => {
  console.log(`${code} received!`);
});
