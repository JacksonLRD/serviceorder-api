import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/login', UserController.authenticate);
userRouter.post('/', UserController.create);

export default userRouter;
