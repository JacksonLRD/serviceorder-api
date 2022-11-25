import express from 'express';
import userRouter from './user.routes';

const routes = express();

routes.use('/vehicles', userRouter);

export default routes;
