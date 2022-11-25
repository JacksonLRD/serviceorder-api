import 'express-async-errors';
import 'reflect-metadata';
import '../infra/dependencies/dependencyInjector';
import 'dotenv/config';
import { env } from 'process';
import express from 'express';

import createMiddlewares from '../infra/middlewares/middlewares';

const { PORT } = env;
const port = PORT ?? 3300;

const app = express();
createMiddlewares(app);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function shutDown(event: string) {
  return (code: number | string) => {
    console.info(`Received kill signal, shutting down gracefully.\nEvent: ${event}`);
    server.close(() => {
      console.log('\nClosed out remaining connections');

      process.exit(0);
    });
  };
}

process.on('SIGINT', shutDown('SIGINT'));

process.on('SIGTERM', shutDown('SIGTERM'));

process.on('exit', (code) => {
  console.log(`${code} received!`);
});
