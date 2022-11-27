import express from 'express';
import userRouter from './user.routes';

const routes = express();

routes.use('/users', userRouter);

export default routes;
