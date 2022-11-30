import express from 'express';
import userRouter from '../../../modules/users/infra/http/router/userRouter';

const routes = express();

routes.use('/users', userRouter);

export default routes;
